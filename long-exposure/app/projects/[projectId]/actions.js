'use client'
import { createClient } from "../../utils/supabase/client";

export const uploadVideo = async (project_id, video) => {
    
    console.log(project_id)
    const supabase = createClient();
    const userId = (await supabase.auth.getUser()).data.user.id;
    
    console.log(userId)
    console.log(video.name)

    const { data, error } = await supabase.storage.from(`projects/${userId}`).upload(`/${project_id}/videos/${video.name}`, video, {
        contentType: video.type,
    });
    if (error) {
        throw error;
    }
    return data;
}

export const deleteVideo = async (project_id, video) => {
    const supabase = createClient();
    const userId = (await supabase.auth.getUser()).data.user.id;

    const { data, error } = await supabase.storage.from(`projects`).remove([`${userId}/projects/${project_id}/videos/${video}`]);
    if (error) {
        throw error;
    }
    return data;
}

export const getVideos = async (project_id) => {
    const supabase = createClient();
    const userId = (await supabase.auth.getUser()).data.user.id;
    const { data, error } = await supabase.storage.from(`projects`).list(`${userId}/projects/${project_id}/videos`);
    if (error) {
        throw error;
    }
    console.log(data)
    return data;
}

/*
const tus = require('tus-js-client')
import { createClient } from "../../utils/supabase/client";

export const uploadVideo = async (project_id, file) => {
    
    const supabase = createClient();
    const userId = (await supabase.auth.getUser()).data.user.id;

    supabase.auth.getSession().then((session) => {
        var upload = new tus.Upload(file, {
            endpoint: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/upload/resumable`,
            retryDelays: [0, 3000, 5000, 10000, 20000],
            headers: {
                authorization: `Bearer ${session.data.session.access_token}`, ////session.access_token}
                'x-upsert': 'true', // optionally set upsert to true to overwrite existing files
            },
            uploadDataDuringCreation: true,
            removeFingerprintOnSuccess: true, // Important if you want to allow re-uploading the same file https://github.com/tus/tus-js-client/blob/main/docs/api.md#removefingerprintonsuccess
            metadata: {
                bucketName: `projects`,
                objectName: `${userId}/${project_id}/videos/${file.name}`,
            },
            chunkSize: 6 * 1024 * 1024, // NOTE: it must be set to 6MB (for now) do not change it
            onError: function (error) {
                console.log('Failed because: ' + error)
                reject(error)
            },
            onProgress: function (bytesUploaded, bytesTotal) {
                var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2)
                console.log(bytesUploaded, bytesTotal, percentage + '%')
            },
            onSuccess: function () {
                console.log('Download %s from %s', upload.file.name, upload.url)
                resolve()
            },
            
        });
    })
}*/