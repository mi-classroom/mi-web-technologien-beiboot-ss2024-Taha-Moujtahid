"use client"
import { usePathname } from "next/navigation";
import {hasAccess} from "./access_table";
    
export default function RBAC_Wrapper ({role, children}) {
    var authorized = false;
    var pathname = usePathname();

    if (hasAccess(role, pathname)) {
        authorized = true;
    }
        
    if (authorized) {
        return( children )
    } else {
        return (
            <div>
                <h1>Not authorized</h1>
            </div>
        )
    }
}