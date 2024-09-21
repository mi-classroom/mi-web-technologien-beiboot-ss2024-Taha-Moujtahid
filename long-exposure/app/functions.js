"use server"

import {jwtDecode} from 'jwt-decode'
import { createClient } from "./utils/supabase/server";

export const getUserRole = async () => {
    const supabase = createClient();
    
    const { data: { session } } = await supabase.auth.getSession();

    var userRole = "anon";
    if(session){
        userRole = jwtDecode(session.access_token).user_role;
        return userRole;
    }
    return userRole;
}