import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import { Search, File, Download, Star, Brain, Filter } from "lucide-react"
import { useState } from "react"
import { useEmbeddingSearch } from "@/hooks/useWails"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [similarityThreshold, setSimilarityThreshold] = useState([70])
  const [searchResults, setSearchResults] = useState<any[]>([])
  
  const embeddingSearch = useEmbeddingSearch()

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    
    try {
      const results = await embeddingSearch.mutateAsync({
        query: searchQuery,
        threshold: similarityThreshold[0]
      })
      setSearchResults(Array.isArray(results) ? results : [])
    } catch (error) {
      console.error('Search failed:', error)
      setSearchResults([])
    }
  }

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 90) return 'text-success'
    if (similarity >= 80) return 'text-primary'
    if (similarity >= 70) return 'text-warning'
    return 'text-muted-foreground'
  }

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Embedding Search</h1>
            <p className="text-muted-foreground">Search files across the network using AI-powered similarity</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="border-primary/20 hover:bg-primary/10">
              <Brain className="h-4 w-4 mr-2" />
              Train Model
            </Button>
            <Button variant="outline" className="border-primary/20 hover:bg-primary/10">
              <Filter className="h-4 w-4 mr-2" />
              Advanced
            </Button>
          </div>
        </div>

        {/* Search Interface */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Semantic Search</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Describe the content you're looking for..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50 border-border/50"
                />
              </div>
              <Button 
                onClick={handleSearch}
                disabled={embeddingSearch.isPending || !searchQuery.trim()}
                className="bg-gradient-primary shadow-primary hover:shadow-glow transition-all"
              >
                {embeddingSearch.isPending ? 'Searching...' : 'Search Network'}
              </Button>
            </div>

            {/* Search Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Similarity Threshold: {similarityThreshold[0]}%
                </label>
                <Slider
                  value={similarityThreshold}
                  onValueChange={setSimilarityThreshold}
                  max={100}
                  min={50}
                  step={5}
                  className="w-full"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-primary/30 text-primary">
                  Embedding Model: sentence-transformers/all-MiniLM-L6-v2
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-foreground">Search Results</span>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                {searchResults.length} results found
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              <div className="space-y-3">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex-shrink-0">
                      <File className="h-5 w-5 text-file-shared" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {result.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{result.size}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">from {result.peer}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <Badge variant="outline" className="text-xs border-file-shared/30 text-file-shared">
                          {result.type}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-warning" />
                          <span className={`text-sm font-medium ${getSimilarityColor(result.similarity)}`}>
                            {result.similarity}%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">similarity</p>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Search Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">847</p>
                  <p className="text-sm text-muted-foreground">Total Searches</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-success/10">
                  <Brain className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">12.4k</p>
                  <p className="text-sm text-muted-foreground">Embeddings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-warning/10">
                  <Star className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">94%</p>
                  <p className="text-sm text-muted-foreground">Avg Accuracy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}