import React, { useState } from 'react';
import axios from 'axios';

const ExampleComponent = () => {
    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('');

    const handleTranslate = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/translate', {
                text,
                targetLanguage: 'es'
            });
            setTranslatedText(response.data.translation);
        } catch (error) {
            console.error('Error translating text:', error);
            alert('Error translating text');
        }
    };

    return (
        <div className="container mx-auto px-4 pt-20"> {/* Adjust padding for spacing */}
            <div className="bg-white p-4 rounded shadow-md">
                <textarea
                    className="w-full p-2 border border-gray-300 rounded"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text to translate"
                ></textarea>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    onClick={handleTranslate}
                >
                    Translate
                </button>
                {translatedText && (
                    <div className="mt-4 p-2 bg-gray-100 rounded">
                        <h3 className="font-semibold">Translated Text:</h3>
                        <p>{translatedText}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExampleComponent;
