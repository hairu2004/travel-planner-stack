import React, { useState } from 'react';
import axios from 'axios';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'zh', name: 'Chinese' },
    { code: 'hi', name: 'Hindi' },
    { code: 'ta', name: 'Tamil' },
    { code: 'te', name: 'Telugu' },
    { code: 'kn', name: 'Kannada' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'mr', name: 'Marathi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'pa', name: 'Punjabi' },
    { code: 'ur', name: 'Urdu' },
    { code: 'tr', name: 'turkish' },
    // Add more languages as needed
];

const TranslationForm = () => {
    const [text, setText] = useState('');
    const [sourceLanguage, setSourceLanguage] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('');
    const [translatedText, setTranslatedText] = useState('');

    const handleTranslate = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/translate', {
                text,
                sourceLanguage,
                targetLanguage
            });
            setTranslatedText(response.data.translation);
        } catch (error) {
            console.error('Error translating text:', error);
            alert('Error translating text');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Translate Text</h2>
            <textarea
                className="w-full p-2 border border-gray-300 rounded"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to translate"
            ></textarea>
            <select
                className="mt-4 p-2 border border-gray-300 rounded w-full"
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value)}
            >
                <option value="">Select source language</option>
                {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                        {lang.name}
                    </option>
                ))}
            </select>
            <select
                className="mt-4 p-2 border border-gray-300 rounded w-full"
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
            >
                <option value="">Select target language</option>
                {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                        {lang.name}
                    </option>
                ))}
            </select>
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
    );
};

export default TranslationForm;
