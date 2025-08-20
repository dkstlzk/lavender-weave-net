import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { File, Folder, Upload, Search, Download, Share2, MoreHorizontal } from "lucide-react"
import { useState } from "react"

// Mock data
const files = [
  { id: '1', name: 'Research Papers', type: 'folder', size: 0, shared: true, lastModified: '2 days ago' },
  { id: '2', name: 'machine-learning.pdf', type: 'file', size: '2.4 MB', shared: true, lastModified: '1 hour ago' },
  { id: '3', name: 'dataset.csv', type: 'file', size: '45.2 MB', shared: false, lastModified: '3 hours ago' },
  { id: '4', name: 'Images', type: 'folder', size: 0, shared: true, lastModified: '1 day ago' },
  { id: '5', name: 'blockchain-research.docx', type: 'file', size: '1.8 MB', shared: true, lastModified: '5 hours ago' },
]

export default function FilesPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Files</h1>
            <p className="text-muted-foreground">Manage your shared files and folders</p>
          </div>
          
          <div className="flex gap-3">
            <Button className="bg-gradient-primary shadow-primary hover:shadow-glow transition-all">
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </Button>
            <Button variant="outline" className="border-primary/20 hover:bg-primary/10">
              <Share2 className="h-4 w-4 mr-2" />
              Share Folder
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search files and folders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50 border-border/50"
                />
              </div>
              <Button variant="outline" size="sm">
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* File Browser */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-foreground">File Browser</span>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                {filteredFiles.filter(f => f.shared).length} shared
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              <div className="space-y-2">
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex-shrink-0">
                      {file.type === 'folder' ? (
                        <Folder className="h-5 w-5 text-file-shared" />
                      ) : (
                        <File className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {file.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {file.type === 'file' && (
                          <span className="text-xs text-muted-foreground">{file.size}</span>
                        )}
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{file.lastModified}</span>
                        {file.shared && (
                          <>
                            <span className="text-xs text-muted-foreground">•</span>
                            <Badge variant="outline" className="text-xs border-success/30 text-success">
                              Shared
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Storage Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">2.1 GB</p>
                  <p className="text-sm text-muted-foreground">Total Uploaded</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-file-shared/10">
                  <Share2 className="h-6 w-6 text-file-shared" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">147</p>
                  <p className="text-sm text-muted-foreground">Files Shared</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-success/10">
                  <Download className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">89</p>
                  <p className="text-sm text-muted-foreground">Downloads</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}