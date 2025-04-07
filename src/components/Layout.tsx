import Header from '@/modules/Header'
import Footer from '@/modules/Footer'
import Adsense from '@/modules/Adsense'
import TabNav from './TabNav' 
import { useState } from 'react'
import { fetchCSV } from '../utils/fetchCSV'
import { SHEETS } from '../constants/googleSheetUrls'
import { Profile } from '../types/profile'
import { useEffect } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [profileObj, setProfileObj] = useState<Record<string, string>>({})

  useEffect(() => {
    const load = async () => {
      const [profileRaw] = await Promise.all([
        fetchCSV(SHEETS.profile),
      ])

      setProfileObj(Object.fromEntries(profileRaw.map((p: Profile) => [p.key, p.value])))
    }

    load()
  }, [])
  
  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen font-sans lg:py-8">
      <div className="max-w-xl mx-auto lg:bg-gray-50 rounded-xl p-6 space-y-6">
        <Header profile={profileObj} />
        <TabNav />
        <main className="flex-1">{children}</main>
        <Adsense />
        <Footer />
      </div>
    </div>
  )
}