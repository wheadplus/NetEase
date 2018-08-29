// const song = {
//     init(){
//         this.$lyric = $('.lyric-text')
//         let lyric = null
//         this.audio = document.createElement('audio')
//         this.audio.src = '../../assets/music.mp3'
        
//         this.bind()
//         this.getdata()
//     },
//     bind(){
//         this.audio.oncanplay = function(){
//             this.audio.play()
//             $('section.disk .circle').addClass('playing')
//         }
//         this.$('section.disk').onclick(function(){
            
//         })
//     },
//     musicPlay(){

//     },
//     getdata(){
//         var _this = this
//         $.get('../../assets/lyric.json').then(res=>{
            
//             this.lyric = res.lyric
//             let array = this.lyric.split("\n")
//             console.log('\n 过滤',array)
//             let regex = /^\[(.+)\](.+)$///以[开头 (.出现多次)  中间] (.出现多次) 
//             array = array.map((string,index)=>{      
//                 let matches = string.match(regex)
//                 if(matches){
//                     return {time: matches[1],words: matches[2]}
//                 }
//             })
//             console.log(array)
//             array.map(function(object){
//                 let $p = $('<li/>')
//                 if(object== undefined){return}
//                 $p.attr('data-time',object.time).text(object.words)
//                 $p.appendTo(_this.$lyric)
//             })
//         })

//     },
//     renderLyric(){
        
//     }
// }
// song.init()
$lyric = $('.lyric-text')
$circle = $('.circle')
let audio = document.createElement('audio')
        audio.src = '../../assets/music.mp3'
$(function() {
    $.get('../../assets/lyric.json').then(res =>  {
        let {lyric} = res
        let array = lyric.split('\n')
        let regex = /^\[(.+)\](.+)$/
        //歌词处理
        array = array.map(function(string) {
            let matches = string.match(regex)
            if(matches) {
                return { time : matches[1], words : matches[2]}
            }
        })
        //页面渲染
        array.map((object) => {
            let $p = $('<li/>')
            if(!object){return}
            $p.attr('data-time',object.time).text(object.words)
            $lyric.append($p)
            
        })

        
       
        
    })
})
audio.oncanplay = () => { 
    audio.play()
    $circle.addClass("playing")
}
$circle.on("click", ()=>{
    $circle.toggleClass("pause")
    console.log()
    $circle.hasClass('pause') ? audio.pause() : audio.play()
    
       
    
})