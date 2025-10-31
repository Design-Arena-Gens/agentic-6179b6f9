'use client'

interface Props {
  result: string
}

export default function ConsultationResult({ result }: Props) {
  const formatResult = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.trim().startsWith('#')) {
        const level = line.match(/^#+/)?.[0].length || 1
        const content = line.replace(/^#+\s*/, '')
        const sizes = ['text-2xl', 'text-xl', 'text-lg']
        return (
          <h3 key={index} className={`${sizes[level - 1] || 'text-base'} font-bold mt-6 mb-3 text-gray-800`}>
            {content}
          </h3>
        )
      }
      if (line.trim().startsWith('*') || line.trim().startsWith('-')) {
        return (
          <li key={index} className="ml-6 mb-2 text-gray-700">
            {line.replace(/^[*-]\s*/, '')}
          </li>
        )
      }
      if (line.trim() === '') {
        return <br key={index} />
      }
      return (
        <p key={index} className="mb-3 text-gray-700 leading-relaxed">
          {line}
        </p>
      )
    })
  }

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-full p-3 mr-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Your Personalized Plan</h2>
      </div>

      <div className="prose max-w-none">
        {formatResult(result)}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={() => window.print()}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          📄 Print Plan
        </button>
      </div>
    </div>
  )
}
