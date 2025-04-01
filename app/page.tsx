"use client";

import React, { useState, useRef, useEffect } from "react";
import { Toaster, toast } from 'sonner'

// Define types for the subject scores object
interface SubjectScores {
  [subjectCode: string]: {
    subject_name: string;
    total_marks: number;
  };
}

// const credits = {
//   BCS501: 4,
//   BCS502: 4,
//   BCS503: 4,
//   BCGL504: 1,
//   BCG586: 2,
//   BRMK557: 3,
//   BCS508: 1,
//   BPEK559: 0,
//   BCS515B: 3,
//   BNSK559: 0
// };

const getGradePoint = (marks: number): number => {
  if (marks >= 90) return 10;
  if (marks >= 80) return 9;
  if (marks >= 70) return 8;
  if (marks >= 60) return 7;
  if (marks >= 50) return 6;
  if (marks >= 45) return 5;
  if (marks >= 40) return 4;
  return 0;
};



function App() {

   
  const [credits, setCredits] = useState<{ [key: string]: number }>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [subjectScores, setSubjectScores] = useState<SubjectScores | null>(null);
  const [sgpa, setSGPA] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean | null>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch credits dynamically from API
  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/deepakdnayak/datasets/refs/heads/main/courseCredits");
        if (!response.ok) {
          toast.error("Failed to load credits data.");
          return;
        }
        const data = await response.json();
        setCredits(data);
      } catch (err) {
        toast.error("Error fetching credits data.");
      }
    };
    fetchCredits();
  }, []);

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result.split(",")[1]);
        } else {
          reject("Failed to read file as string.");
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const calculateSGPA = (subjectScores: SubjectScores): number => {
    let totalCredits = 0;
    let totalWeightedGradePoints = 0;
    for (const subjectCode in subjectScores) {
      if (subjectCode in credits) {
        const marks = subjectScores[subjectCode].total_marks;
        const gradePoint = getGradePoint(marks);
        const credit = credits[subjectCode as keyof typeof credits];
  
        totalCredits += credit;
        totalWeightedGradePoints += gradePoint * credit;
      } else {
        toast.warning(`Warning: No credit found for ${subjectCode}`)
      }
    }
  
    return totalCredits > 0 ? totalWeightedGradePoints / totalCredits : 0;
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      toast.error("No image file selected.")
      return;
    }
    setLoading(true);

    try {
      const base64Image = await toBase64(imageFile);
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    inlineData: {
                      mimeType: "image/png",
                      data: base64Image,
                    },
                  },
                  {
                    text: `Extract the subject codes, their corresponding subject names, and total marks from the image. 
                            Provide output as a JSON object where each subject code is a key and its value is an object containing:
                            - "subject_name": The full name of the subject.
                            - "total_marks": The total marks obtained as an integer.
                            Ensure the output is a valid JSON object without any formatting or markdown, like this example:

                            {
                                "BCS501": { "subject_name": "Data Structures", "total_marks": 80 },
                                "BCS502": { "subject_name": "Computer Networks", "total_marks": 87 },
                                "BCS503": { "subject_name": "Database Management Systems", "total_marks": 84 },
                                "BCGL504": { "subject_name": "Environmental Science", "total_marks": 100 },
                                "BCG586": { "subject_name": "Artificial Intelligence", "total_marks": 98 },
                                "BRMK557": { "subject_name": "Marketing Strategies", "total_marks": 80 },
                                "BCS508": { "subject_name": "Cyber Security", "total_marks": 79 },
                                "BPEK559": { "subject_name": "Physical Education", "total_marks": 96 },
                                "BCS515B": { "subject_name": "Machine Learning", "total_marks": 89 }
                            }`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        toast.error(`HTTP error! status: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      let generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      generatedText = generatedText.replace(/```json|```/g, "").trim();
      const parsedScores: SubjectScores = JSON.parse(generatedText);
      setSubjectScores(parsedScores);
      setSGPA(calculateSGPA(parsedScores));
      setLoading(false);
    } catch (err) {
      toast.error((err as Error).message);
      setLoading(false);
    }
  };

  return (
    <>
    <Toaster position="bottom-right" richColors />
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-4xl font-bold text-center mb-7">
        Advanced SGPA Calcultor
      </h1>

      {!subjectScores && (
        <>
          <div
            className="border-2 border-dashed border-gray-400 rounded-xl p-6 text-center cursor-pointer hover:border-gray-600 bg-gray-100 flex flex-col items-center justify-center min-h-[250px]"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              setImageFile(e.dataTransfer.files[0]);
            }}
            onClick={() => fileInputRef.current?.click()}
            onPaste={(e) => {
              const items = e.clipboardData.items;
              for (let item of items) {
                if (item.type.startsWith("image/")) {
                  setImageFile(item.getAsFile());
                  break;
                }
              }
            }}
          >
            {imageFile ? (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Uploaded"
                className="max-h-40 mx-auto rounded-md"
              />
            ) : (
              <p className="text-gray-600">
                Drag & Drop, Click to Upload, or Paste an Report Card Image Here
              </p>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
            className="hidden"
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
          >
            Submit
          </button>

          {loading && (
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}
        </>
      )}

      {subjectScores && (
        <>
          <h2 className="text-5xl text-center font-bold mt-2">
            SGPA : <span className="text-amber-300">{sgpa?.toFixed(2)}</span>
          </h2>
          <div className="mt-4 p-4 border rounded-md bg-white shadow">
            <h2 className="text-xl font-bold text-center mb-5">
              Subject Scores:
            </h2>
            <div className="overflow-x-auto">
              {subjectScores && (
                <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-md">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border px-4 py-2">Subject Code</th>
                      <th className="border px-4 py-2">Subject Name</th>
                      <th className="border px-4 py-2">Credits</th>
                      <th className="border px-4 py-2">Total Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(subjectScores).map(([code, details]) => (
                      <tr key={code} className="border">
                        <td className="border px-4 py-2">{code}</td>
                        <td className="border px-4 py-2">
                          {details.subject_name}
                        </td>
                        <td className="border px-4 py-2">
                          {credits[code as keyof typeof credits]}
                        </td>
                        <td className="border px-4 py-2">
                          {details.total_marks}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      )}
    </div>
    </>
  );
}

export default App;
