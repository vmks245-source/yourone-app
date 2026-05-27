'use client'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function PlacePage() {
  const params = useParams()
  const code = params.code as string

  useEffect(() => {
    // Redirect to home which handles code decoding
    window.location.href = `/?code=${code}`
  }, [code])

  return (
    <div style={{ minHeight:'100vh', background:'#000', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <p style={{ color:'rgba(255,255,255,0.4)', fontStyle:'italic' }}>Opening your world...</p>
    </div>
  )
}
