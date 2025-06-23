/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuth } from "@clerk/clerk-react";
import { CircleStop, Loader, Mic, RefreshCw, Save, Video, VideoOff, WebcamIcon } from "lucide-react";
import { useEffect, useState } from "react";
import useSpeechToText,  { type ResultType} from "react-hook-speech-to-text";
import { useParams } from "react-router";
import WebCam from "react-webcam";
import { ToolTipButton } from "./tooltip-button";
import { toast } from "sonner";
import { chatSession } from "@/scripts";
import { SaveModal } from "./save-modal";
import { addDoc, collection, getDoc, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "@/config/firebase.config";

interface RecordAnswerProps{
    question: {question: string; answer:string};
    isWebCam: boolean;
    setIsWebCam: (value: boolean) => void;
}

interface AIResponse{
    ratings: number;
    feedback: string;
}

export const RecordAnswer = ({question, isWebCam, setIsWebCam}: RecordAnswerProps) => {

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });

      const [userAnswer , setUserAnswer ] = useState("");
      const [isAiGenrating, setIsAiGenrating] = useState(false);
      const [aiResult, setAiResult] = useState<AIResponse | null>(null);
      const [open, setOpen] = useState(false);
      const [loading, setLoading] = useState(false);

      const {userId} = useAuth();
      const {interviewId} = useParams();

      const recordUserAnswer = async() => {
        if(isRecording){
          stopSpeechToText();

          if(userAnswer?.length < 30){
            toast.error("Error", {
              description: "Your answer should be more than 30 characters"
            });

            return;
          }

          // ai result 
          const aiResult = await genrateResult(
            question.question,
            question.answer,
            userAnswer
          )
          
          
          setAiResult(aiResult)
        }else{
          startSpeechToText();
        }
      }

      const cleanJsonResponse = (responseText: string): AIResponse => {
        let cleanText = responseText.trim();
      
        // Remove markdown formatting and extra labels
        cleanText = cleanText.replace(/(json|```|`)/gi, "");
      
        // Try to locate JSON inside possible extra content
        const jsonStart = cleanText.indexOf("{");
        const jsonEnd = cleanText.lastIndexOf("}");
        if (jsonStart === -1 || jsonEnd === -1) {
          throw new Error("Could not find JSON in the response");
        }
      
        cleanText = cleanText.slice(jsonStart, jsonEnd + 1);
      
        // Replace unescaped control characters with space (common in LLM output)
        cleanText = cleanText.replace(/[\u0000-\u001F]+/g, " ");
      
        try {
          return JSON.parse(cleanText);
        } catch (error) {
          throw new Error("Invalid JSON format: " + (error as Error)?.message);
        }
      };
      

      const genrateResult = async(
        qst: string,
        qstAns: string,
        userAns: string
      ): Promise<AIResponse> => {
        setIsAiGenrating(true);
        const prompt = `
Question: "${qst}"
User Answer: "${userAns}"
Correct Answer: "${qstAns}"

Please compare the user's answer to the correct answer and:
- Rate the answer from 1 to 10 under a "ratings" field.
- Provide concise feedback under a "feedback" field.

Return **only a JSON** object in this format (no commentary, no explanation):

{
  "ratings": 7,
  "feedback": "Your answer is good but lacks details about XYZ."
}
`.trim();


        try {
          const aiResult = await chatSession.sendMessage(prompt);

          const parsedResult: AIResponse = cleanJsonResponse(
            aiResult.response.text()
          );
          return parsedResult;

        } catch (error) {
          console.log(error)
          toast("Error", {
            description: "An error occured while genrating feedback."
          });
          return {ratings:0 , feedback: "Unable to generate feedback"};
        }finally{
          setIsAiGenrating(false)
        }
      }

      const recordNewAnswer = () => {
        setUserAnswer("");
        stopSpeechToText();
        startSpeechToText();
      };

      const saveUserAnswer = async() => {
        setLoading(true);

        if(!aiResult){
          return 
        }

        const currentQuestion = question.question;

        try {
            // query the firebase to check if the user answer already exists for this question
            
            const userAnswerQuery = query(
              collection(db, "userAnswers"),
              where("userId", "==", userId),
              where("question","==", currentQuestion)
            );

            const querySnap = await getDocs(userAnswerQuery);

            // if user already answered the question don't save again

            if(!querySnap.empty){
              console.log("Query Snap Size", querySnap.size);
              toast.info("Already Answered", {
                description: "You have already answered this question"
              });
              return;
            }else{
              //save the user answer

              const questionAnswerRef = await addDoc(collection(db,"userAnswers"),{
                mockIdRef: interviewId,
                question: question.question,
                correct_ans: question.answer,
                user_ans: userAnswer,
                feedback: aiResult.feedback,
                rating: aiResult.ratings,
                userId,
                createdAt: serverTimestamp(),
              })

              toast("Saved", {description: "Your answer has been saved..."})
            }
            setUserAnswer("");
            stopSpeechToText();
          
        } catch (error) {
            toast("Error", {
              description: "An error occured while genrating feedback."
            }
            )
            console.log(error)
        }finally{
          setLoading(false)
          setOpen(!open);
        }
      }

      useEffect(() => {
        const combineTranscripts = results.filter((result): result is ResultType => typeof result !== "string")
        .map((result) => result.transcript)
        .join(" ");

        setUserAnswer(combineTranscripts);
      }, [results])

  return (
    <div className="w-full flex flex-col items-center gap-8 mt-4">
      
      {/* save modal */}
      <SaveModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={saveUserAnswer}
        loading={loading}
        />

      <div className="w-full h-[400px] md:w-96 flex flex-col items-center justify-center border p-4 bg-gray-50 rounded-md">
          {
            isWebCam ? (
              <WebCam 
              onUserMedia={ () => setIsWebCam(true) }
              onUserMediaError={ () => setIsWebCam(false)}
              className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <WebcamIcon className="min-w-24 min-h-24 text-muted-foreground" />
            )
          }
        </div>

          <div className="flex items-center justify-center gap-3 ">
            <ToolTipButton 
                content={isWebCam ? "Turn Off " : "Turn On"}
                icon={
                  isWebCam ? (
                    <VideoOff className="min-w-5 min-h-5" />
                  ) : ( 
                    <Video className="min-w-5 min-h-5" />
                  )
                }
                onClick={() => setIsWebCam(!isWebCam)}
                />

            <ToolTipButton 
                content={isRecording ? "Stop Recording " : "Start Recording"}
                icon={
                  isRecording ? (
                    <CircleStop className="min-w-5 min-h-5" />
                  ) : ( 
                    <Mic className="min-w-5 min-h-5" />
                  )
                }
                onClick={recordUserAnswer}
                />

                <ToolTipButton 
                  content="Record Again"
                  icon={<RefreshCw className="min-w-5 min-h-5"/> }
                  onClick={recordNewAnswer}
                  />

                <ToolTipButton 
                  content="Save Result"
                  icon={
                    isAiGenrating ? (
                      <Loader className="min-w-5 min-h-5 animate-spin" />
                    ) : (
                      <Save className="min-w-5 min-h-5" />
                    )
                  }
                  onClick={() => setOpen(!open)}
                  disabled={!aiResult}
                  />


          </div>

          <div className="w-full mt-4 p-4 border rounded-md bg-gray-50">
            <h2 className="text-lg font-semibold ">Your Answer:</h2>

            <p className="text-sm mt-2 text-gray-700 whitespace-normal ">
              {userAnswer || "Start Recording to see your answer here"}
            </p>

            {interimResult && ( 
              <p className="text-sm text-gray-700 mt-2">
                <strong>Current Speech:</strong>
                {interimResult}
              </p>
            )}
          </div>

    </div>
  )
}
