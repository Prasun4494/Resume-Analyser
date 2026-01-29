import React from 'react';

const ScoreCard = ({ title, score }) => (
    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
        <div className="text-slate-400 text-sm mb-1 uppercase tracking-wider">{title}</div>
        <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-white">{score}</span>
            <span className="text-slate-500 text-sm mb-1">/ 100</span>
        </div>
        <div className="w-full bg-slate-700 h-2 rounded-full mt-3 overflow-hidden">
            <div
                className="bg-white h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${score}%` }}
            ></div>
        </div>
    </div>
);

const AnalysisResult = ({ data }) => {
    if (!data) return null;

    return (
        <div className="w-full max-w-4xl mx-auto animate-fade-in pb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <ScoreCard title="Experience" score={data.experienceScore} />
                <ScoreCard title="Formatting" score={data.formattingScore} />
                <ScoreCard title="ATS Score" score={data.atsScore} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                    <h3 className="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">Overview</h3>
                    <p className="text-slate-300 leading-relaxed mb-6">{data.summary}</p>

                    <h4 className="text-white font-semibold mb-3">Project Feedback</h4>
                    <p className="text-slate-300 leading-relaxed">{data.projectFeedback}</p>
                </div>

                <div className="space-y-6">
                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <h3 className="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">Key Skills</h3>
                        <div className="mb-4">
                            <h4 className="text-sm text-slate-400 mb-2 uppercase tracking-wide">Technical</h4>
                            <div className="flex flex-wrap gap-2">
                                {data.technicalSkills.map((skill, i) => (
                                    <span key={i} className="px-3 py-1 bg-slate-700 text-slate-200 text-sm rounded-full border border-slate-600">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm text-slate-400 mb-2 uppercase tracking-wide">Soft Skills</h4>
                            <div className="flex flex-wrap gap-2">
                                {data.softSkills.map((skill, i) => (
                                    <span key={i} className="px-3 py-1 bg-slate-700 text-slate-200 text-sm rounded-full border border-slate-600">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <h3 className="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">Suggestions</h3>
                        <ul className="space-y-3">
                            {data.suggestions.map((suggestion, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-300">
                                    <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-blue-500"></span>
                                    <span>{suggestion}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalysisResult;
