function save(type,val){
    setInterval(()=>{
        sessionStorage[String(type)] = JSON.stringify(val)
    },1000)
}

export { save }