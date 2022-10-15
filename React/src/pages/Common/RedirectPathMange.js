
export function loginRedirectCall(){
    let path= window.location.protocol+"//"+window.location.host+"/login" 
//    window.open(path,'mywindow').focus()
console.log(path)
    window.location.href = path;
  }

export function homeRedirectCall(){
    let path= window.location.protocol+"//"+window.location.host+"/"
//    window.open(path,'mywindow').focus()
    console.log(path)
    window.location.href = path;  
}

export function logOutRedirectCall(){
  localStorage.removeItem("MAisLogin");
  localStorage.removeItem("MAid");
  localStorage.removeItem("MAtoken");
  localStorage.removeItem("MAname");
  localStorage.removeItem("MAemail");

  loginRedirectCall()
}

export function loginRedirectCallWithDataStore(data){
  console.log("Redirect Call")
  console.log(data)
  localStorage.setItem("MAisLogin",true);
  localStorage.setItem("MAid",data.id);
  localStorage.setItem("MAtoken",data.token);
  localStorage.setItem("MAname",data.name);
  localStorage.setItem("MAemail",data.email);
  homeRedirectCall()
}


  