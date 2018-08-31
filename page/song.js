
$lyric = $('.lyric-text')
$lines = $('.lyric-text li')
$circle = $('.circle')
$lyricTitle = $('.lyric > p')
let audio = document.createElement('audio')


let id = location.search.match(/id=([^&]*)/)[1]

$.get("../assets/songs.json").then(res => {
    let songs = res
    let song = songs.filter(song => {
        // console.log(typeof song.id ,typeof id)
        return song.id === id   
    })[0];
    
    let { url, name , lyric } = song
    
    initPlayer.call(undefined,url)
    initText(name, lyric)
})

function initText(name , lyric) {
    
    $lyricTitle.text(name)
    parseLyric(lyric)

}
function initPlayer(url) {
    audio.src = url

    audio.oncanplay = () => { 
        audio.play()
        $circle.addClass("playing")
    }

    setInterval(() => {
        let second = audio.currentTime
        let munites = ~~(second / 60)
        let left = second - munites * 60 
        let time = `${pad(munites)}:${pad(left)}`
        console.log(time)
        let $whichLine
        $lines = $('.lyric-text li')
        console.log('xxxx',$lines.length)
        
        for(let i=0; i<$lines.length;i++) {
            let currentLineTime = $lines.eq(i).attr('data-time')
            let nextLineTime = $lines.eq(i+1).attr('data-time')
            
            if( $lines.eq(i+1).length > 0 && currentLineTime< time &&  nextLineTime > time) {
                $whichLine = $lines.eq(i)
                break
            }
        }
        console.log(333,$whichLine)
        if($whichLine) {
            $whichLine.addClass('active').prev().removeClass('active')
            console.log($whichLine.offset().top)
            let top = $whichLine.offset().top
            let linesTop = $lyric.offset().top
            let delta = top - linesTop 
            console.log("height",delta)
            $lyric.css('transform', `translateY(-${delta}px)`)
        }

    },1000)
}

function pad(number) {
    return number >=10 ? number + '' : '0' + number
}

function parseLyric(lyric) {
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
    
}

$circle.on("click", ()=>{
    $circle.toggleClass("pause")
    console.log()
    $circle.hasClass('pause') ? audio.pause() : audio.play()
    
       
    
})