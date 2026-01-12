'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CheckCircle, XCircle, Trophy } from 'lucide-react'

import type { BlockRendererProps, LessonQuizBlock } from '../types'

export function LessonQuizRenderer({ data }: BlockRendererProps<LessonQuizBlock>) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const handleSubmit = () => {
    // Calculate score (placeholder logic)
    const totalQuestions = data.questions?.length || 0
    const correctAnswers = Object.keys(answers).length
    const calculatedScore = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0

    setScore(calculatedScore)
    setSubmitted(true)
  }

  const handleReset = () => {
    setAnswers({})
    setSubmitted(false)
    setScore(0)
  }

  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">{data.quizTitle}</h2>
        {data.quizDescription && <p className="text-gray-600">{data.quizDescription}</p>}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>
            <strong>Passing Score:</strong> {data.passingScore || 70}%
          </span>
          <span>
            <strong>Questions:</strong> {data.questions?.length || 0}
          </span>
        </div>
      </div>

      {/* Questions */}
      {data.questions && data.questions.length > 0 ? (
        <div className="space-y-6">
          {data.questions.map((question: any, qIndex: number) => (
            <Card key={question.id || qIndex} className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-semibold flex items-center justify-center">
                  {qIndex + 1}
                </div>
                <div className="flex-1">
                  {/* Question Text */}
                  <div className="font-semibold text-gray-900 mb-3">
                    {/* Rich text - replace with proper renderer */}
                    Question {qIndex + 1} ({question.xpPoints || 10} XP)
                  </div>

                  {/* Multiple Choice Options */}
                  {question.questionType === 'multiple-choice' && question.options && (
                    <div className="space-y-2">
                      {question.options.map((option: any, oIndex: number) => {
                        const optionId = `${option.id}-${oIndex}`
                        return (
                          <label
                            key={option.id || oIndex}
                            className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                              answers[question.id || qIndex] === optionId
                                ? 'bg-purple-50 border-purple-500'
                                : 'hover:bg-gray-50'
                            } ${submitted ? 'pointer-events-none' : ''}`}
                          >
                            <input
                              type="radio"
                              name={`question-${question.id || qIndex}`}
                              value={optionId}
                              checked={answers[question.id || qIndex] === optionId}
                              onChange={(e) =>
                                setAnswers({ ...answers, [question.id || qIndex]: e.target.value })
                              }
                              disabled={submitted}
                              className="w-4 h-4"
                            />
                            <span className="text-gray-700">{option.optionText}</span>
                          </label>
                        )
                      })}
                    </div>
                  )}

                  {/* True/False */}
                  {question.questionType === 'true-false' && (
                    <div className="space-y-2">
                      {['True', 'False'].map((option) => (
                        <label
                          key={option}
                          className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                            answers[question.id || qIndex] === option
                              ? 'bg-purple-50 border-purple-500'
                              : 'hover:bg-gray-50'
                          } ${submitted ? 'pointer-events-none' : ''}`}
                        >
                          <input
                            type="radio"
                            name={`question-${question.id || qIndex}`}
                            value={option}
                            checked={answers[question.id || qIndex] === option}
                            onChange={(e) =>
                              setAnswers({ ...answers, [question.id || qIndex]: e.target.value })
                            }
                            disabled={submitted}
                            className="w-4 h-4"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Short Answer */}
                  {question.questionType === 'short-answer' && (
                    <Input
                      placeholder="Type your answer here..."
                      value={answers[question.id || qIndex] || ''}
                      onChange={(e) =>
                        setAnswers({ ...answers, [question.id || qIndex]: e.target.value })
                      }
                      disabled={submitted}
                      className="mt-2"
                    />
                  )}

                  {/* Explanation (shown after submission) */}
                  {submitted && question.explanation && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900">
                      <strong>Explanation:</strong> {JSON.stringify(question.explanation)}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">No questions available</p>
      )}

      {/* Submit/Results */}
      {!submitted ? (
        <Button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length === 0}
          className="w-full bg-purple-600 hover:bg-purple-700"
          size="lg"
        >
          Submit Quiz
        </Button>
      ) : (
        <Card className="p-6 text-center space-y-4">
          <div className="flex justify-center">
            {score >= (data.passingScore || 70) ? (
              <Trophy className="w-16 h-16 text-yellow-500" />
            ) : (
              <XCircle className="w-16 h-16 text-red-500" />
            )}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Your Score: {score.toFixed(0)}%</h3>
            <p className="text-gray-600 mt-2">
              {score >= (data.passingScore || 70)
                ? '🎉 Congratulations! You passed the quiz!'
                : '💪 Keep practicing! You can retake the quiz.'}
            </p>
          </div>
          <Button onClick={handleReset} variant="outline" size="lg">
            Retake Quiz
          </Button>
        </Card>
      )}
    </div>
  )
}
