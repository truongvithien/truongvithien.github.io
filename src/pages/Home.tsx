import { useEffect, useState } from 'react'
import { fetchCSV } from '@/utils/fetchCSV'
import { SHEETS } from '@/constants/googleSheetUrls'
import { Profile } from '@/types/profile'
import { Product } from '@/types/products'
import { Prompt } from '@/types/prompts'
import { MiniTool } from '@/types/miniTools'

import { Card, CardContent } from '@/components/ui/card'
import { ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

import Header from '@/modules/Header'

export default function Home() {
  const [profileObj, setProfileObj] = useState<Record<string, string>>({})
  const [products, setProducts] = useState<Product[]>([])
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [tools, setTools] = useState<MiniTool[]>([])

  useEffect(() => {
    const load = async () => {
      const [profileRaw, productData, promptData, toolData] = await Promise.all([
        fetchCSV(SHEETS.profile),
        fetchCSV(SHEETS.products),
        fetchCSV(SHEETS.prompts),
        fetchCSV(SHEETS.miniTools),
      ])

      setProfileObj(Object.fromEntries(profileRaw.map((p: Profile) => [p.key, p.value])))
      setProducts(productData.filter((p: Product) => p.show_on_homepage === 'true'))
      setPrompts(promptData.filter((p: Prompt) => p.show_on_homepage === 'true'))
      setTools(toolData.filter((t: MiniTool) => t.show_on_homepage === 'true'))
    }

    load()
  }, [])

  return (
    <div className="space-y-10">
      {/* Profile */}
      {/* Featured Products */}
      {products.length > 0 && (
        <section>
          <h3 className="text-xl font-bold mb-4">🛍️ Featured Products</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {products.map((product, i) => (
              <Card key={i} className="overflow-hidden hover:shadow-md transition">
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="w-full h-40 object-cover"
                />
                <CardContent className="p-4">
                  <h4 className="font-semibold">{product.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                  <a
                    href={product.buy_link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-blue-600 mt-2"
                  >
                    Buy now <ExternalLink className="w-4 h-4" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Featured Prompts */}
      {prompts.length > 0 && (
        <section>
          <h3 className="text-xl font-bold mb-4">🎨 Featured Prompts</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {prompts.map((prompt, i) => (
              <Link to={`/prompts/${prompt.id}`} key={i}>
                <Card className="overflow-hidden hover:shadow-md transition">
                  <img
                    src={prompt.image_url}
                    alt={prompt.title}
                    className="w-full h-40 object-cover"
                  />
                  <CardContent className="p-4">
                    <h4 className="font-semibold">{prompt.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{prompt.prompt}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Mini Tools */}
      {tools.length > 0 && (
        <section>
          <h3 className="text-xl font-bold mb-4">🧰 Mini Tools</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {tools.map((tool, i) => (
              <a href={tool.link_url} target="_blank" rel="noreferrer" key={i}>
                <Card className="overflow-hidden hover:shadow-md transition">
                  <img
                    src={tool.image_url}
                    alt={tool.title}
                    className="w-full h-40 object-cover"
                  />
                  <CardContent className="p-4">
                    <h4 className="font-semibold">{tool.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{tool.description}</p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}