// single project page this is the heart of the app
'use client'

import {
  CircleUser,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Dialog, DialogClose, DialogTrigger, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { usePathname } from "next/navigation"
import { uploadVideo , getVideos, deleteVideo} from "./actions"
import { useEffect, useState } from "react"


function NoVideos(){
    const pathname = usePathname();
    return (
        <div
                className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
            >
                <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                    You have no Videos
                </h3>
                <p className="text-sm text-muted-foreground">
                    You can start creating exports as soon as you upload a video.
                </p>

                <Dialog>
                    <DialogTrigger asChild>
                    <Button className="mt-4">Add Video</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-white">
                        <DialogHeader>
                        <DialogTitle>Add Video</DialogTitle>
                        <DialogDescription>
                        Upload a video to start creating exports.
                        </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <form id="upload_form" onSubmit={(e)=>{
                                e.preventDefault()
                                uploadVideo(pathname,e.target.files.files[0])
                            }}>
                                <Input type="file" id="files"/>
                            </form>
                        </div>
                        </div>
                        <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                            Cancle
                            </Button>
                        </DialogClose>
                        <Button type="submit" form="upload_form">Upload</Button>
                        </DialogFooter>
                    </DialogContent>
                    </Dialog>

                </div>
            </div>
    )
}

function VideoList({videos}){
    const pathname = usePathname();

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
                <div
                    key={video.id}
                    className="flex flex-col items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
                >
                    <div className="flex flex-col items-center gap-1 text-center">
                    <h3 className="text-2xl font-bold tracking-tight">
                        {video.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {video.size}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {video.last_modified}
                    </p>
                    <Button onClick={()=>{
                        deleteVideo(pathname.split("/")[2],video.name)
                    }}>Delete</Button>
                    </div>
                </div>
            ))}
        </div>
    );
}


export default function Project() {

    const [videos, setVideos] = useState([]);

    const pathname = usePathname();

    useEffect(() => {
        getVideos(pathname.split("/")[2]).then((data)=>{
            setVideos(data)
        })
    }, [])

    return (
        <div className="grid min-h-screen w-full">
        <div className="flex flex-col">
            <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <div className="w-full flex-1"/>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Project</h1>
            </div>
                {videos.length === 0 ? <NoVideos></NoVideos> : <VideoList videos={videos}></VideoList>}
            </main>
        </div>
        </div>
    )
}
