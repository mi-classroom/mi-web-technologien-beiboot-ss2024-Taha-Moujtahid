"use server"

import { createClient } from '../utils/supabase/server'
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export const login = async (email,password) => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
    if (error) {
        console.error(error)
    } else {
        console.log(data);
        redirect("/");
    }
}
