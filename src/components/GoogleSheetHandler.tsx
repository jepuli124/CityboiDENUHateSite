import React, { useCallback, useEffect, useState } from 'react'
import Post from './Post';
import eventBusHandler from '../hooks/EventBus';

interface incomingParams{
    sheetId: string
    WORKSHEET_GID: string
}

const parseCSVLine = (line: string): string[] => { //made by qwen 
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result.map(val => val.replace(/^"|"$/g, '')); // strip outer quotes
}

const parseCSV = (text: string) => {
        const lines = text.trim().split('\n');
        if (lines.length < 2) return []

        const result: string[][] = [];

        for (let i = 1; i < lines.length; i++) {
            const values = parseCSVLine(lines[i]);
            result.push(values);
        }

        return result
    }



const GoogleSheetHandler: React.FC<incomingParams> = ({sheetId, WORKSHEET_GID}) => {

    const [data, setData] = useState<string[][]>([]);
    const [loading, setLoading] = useState(true);

    
    const fetchSheet = useCallback(async () => {
        const baseUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${WORKSHEET_GID}`;
         try {
        const res = await fetch(baseUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        
        const csvText = await res.text();
        const rows = parseCSV(csvText);
        

        setData(rows);
        } finally {
        setLoading(false);
        }
    }, [sheetId, WORKSHEET_GID])

    useEffect(( ) => {
        fetchSheet()
            const unsub = eventBusHandler.subscribe("GoogleFormSent", fetchSheet)
        return () => {
            unsub()
        }

    }, [])

    return (
    <div>
        {loading ?
        <>

        </>
        :
        <>
            {data.map((row, index) => (
                <div key={index}>
                    <Post name={row[1]} text={row[2]}></Post>
                </div>
            ))}
        </>
        }

    </div>
    )
}

export default GoogleSheetHandler