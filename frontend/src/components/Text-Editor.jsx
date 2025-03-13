/* eslint-disable react-hooks/exhaustive-deps, no-unused-vars */

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph } from "docx";
import Background from "../assets/Background.png";


const TextEditor = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/user`, { credentials: "include" })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setUser(data);
                } else {
                    navigate("/");
                }
            })
            .catch((err) => console.error("Error fetching user:", err));
    }, []);

    const [text, setText] = useState('');
    const [filename, setFilename] = useState('');
    const textareaRef = useRef(null);

    if (!user) {
        return <p>Loading...</p>;
    }


    const downloadAsDocx = async (text) => {
        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: [new Paragraph(text)],
                },
            ],
        });
    
        const blob = await Packer.toBlob(doc);
        saveAs(blob, `${filename}.docx`);
    };


    return (
        <>
            <div className="relative">
                <img src={Background} alt="Background" className="h-screen md:w-screen object-cover" />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center text-white text-xl bg-black bg-opacity-50 p-16 text-center">
                    <div className="font-bold mt-8">
                        What's on your mind, <span className="text-green-400">{user.name}</span> ?
                        <br />
                        <div className="font-semibold text-white mb-4">
                            Grab some coffee and write your thoughts below...
                        </div>
                    </div>

                    <div className="">
                        <textarea
                            ref={textareaRef}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="bg-transparent text-white text-sm h-80 md:h-56 w-full mt-4 border-2 border-green-400 rounded-md"
                        />
                    </div>

                    <button
                        className="text-editor-button bg-purple-800" onClick={() => downloadAsDocx(text)}
                    >
                        Download as .docx
                    </button>
                    <br /><br />

                    <footer className="text-xs text-slate-300">
                        Designed and Developed by Madhusree Rana in MERN stack and Tailwind CSS
                    </footer>
                </div>

            </div>

        </>
    );
};


export default TextEditor;