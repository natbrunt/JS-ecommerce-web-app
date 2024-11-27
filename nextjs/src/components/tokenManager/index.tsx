'use client'

import { useState, useEffect } from 'react'
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface TokenData {
  id: number
  value: string
}

export default function Component() {
  const [tokenData, setTokenData] = useState<TokenData[]>([])
  const [newValue, setNewValue] = useState('')

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      try {
        const parsedData = JSON.parse(storedToken)
        if (Array.isArray(parsedData)) {
          setTokenData(parsedData)
        }
      } catch (error) {
        console.error('Error parsing token data:', error)
      }
    }
  }, [])

  const addNewToken = () => {
    if (newValue.trim() !== '') {
      const newToken: TokenData = {
        id: Date.now(),
        value: newValue.trim()
      }
      const updatedTokens = [...tokenData, newToken]
      setTokenData(updatedTokens)
      localStorage.setItem('token', JSON.stringify(updatedTokens))
      setNewValue('')
    }
  }

  const removeToken = (id: number) => {
    const updatedTokens = tokenData.filter(token => token.id !== id)
    setTokenData(updatedTokens)
    localStorage.setItem('token', JSON.stringify(updatedTokens))
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Token Manager</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Enter new token value"
          />
          <Button onClick={addNewToken}>Add</Button>
        </div>
        <ul className="space-y-2">
          {tokenData.map(token => (
            <li key={token.id} className="flex justify-between items-center bg-secondary p-2 rounded">
              <span>{token.value}</span>
              <Button variant="destructive" size="sm" onClick={() => removeToken(token.id)}>Remove</Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}