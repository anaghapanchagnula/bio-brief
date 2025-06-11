import { useState } from 'react'
import axios from 'axios'

function App() {
  const [text, setText] = useState('')
  const [summary, setSummary] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const MAX_WORDS = 300

  const handleTextChange = (event) => {
    const words = event.target.value.trim().split(/\s+/)
    if (words.length <= MAX_WORDS || event.target.value === '') {
      setText(event.target.value)
    }
  }

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const res = await axios.post('http://127.0.0.1:8000/summarize', { text })
      setSummary(res.data.summary)
    } catch (error) {
      console.error('Error generating summary:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg">
        <div className="px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">BioBrief</h1>
          <p className="text-gray-600 text-center mb-6">Tool to summarize any abstract of a research paper</p>
  
          <div className="relative w-full">
            <textarea
              className="w-full border border-gray-300 p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 rounded-md"
              rows="6"
              value={text}
              onChange={handleTextChange}
              placeholder="Paste a research abstract here..."
            />
            <div className="absolute bottom-2 right-2 text-sm text-gray-500">
              {wordCount}/{MAX_WORDS} words
            </div>
          </div>
  
          <button
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            onClick={handleSubmit}
            disabled={isLoading || !text.trim()}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Summary...
              </div>
            ) : (
              'Summarize'
            )}
          </button>
  
          {summary && (
            <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Summary</h2>
              <p className="text-gray-600 leading-relaxed">{summary}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App