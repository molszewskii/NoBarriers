import React from "react";
import { useParams } from "react-router-dom";

const NoPermissionPage=({role})=> {
    return (
      <div style={{height: "100vh", width:"100%", display:"flex", flexDirection:"column",alignItems:"center"}}>
        <h1 style={{color:"black", marginLeft:"0"}}>Access Denied</h1>
        <p>You don't have {role} permission to access this page.</p>
      </div>
    );
  }

export default NoPermissionPage;