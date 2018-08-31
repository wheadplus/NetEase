const Index = {
    init(){
        this.$topLists = $('.lastestMusic .topLists')
        this.$loading = $('.js-loading')
        this.$tabNav = $('.tabNav')
        this.$searchInput = $('.searchInput')
        this.$output = $('.output')
        this.timer = undefined

        this.bind()
        this.renderPage1()
    },
    bind(){

        this.$tabNav.on("click",'ul.tabItems>li',function(e){
            let $li = $(e.currentTarget).addClass('active')
            $li.siblings().removeClass('active')
            let index = $li.index()
            $li.trigger('tabChange', index)
            $('.tabContainer > li').eq(index).addClass('active')
            .siblings().removeClass('active')

        })
        this.$tabNav.on('tabChange', (e, index) => {
            let $li = $('.tabContainer > li').eq(index)
            console.log(e,index)
            if($li.attr('data-downloaded') === 'yes') return

            if(index === 1) {
                $.get("../assets/page2.json").then( res => {
                    console.log(res)
                    $li.attr('data-downloaded','yes')
                    //json 数据设置样式
                })
            }else if (index === 2) {
                $.get("../assets/page3.json").then( res => {
                    console.log(res)
                    $li.attr('data-downloaded','yes')
                    //json 数据设置样式
                })
            }
        })

        this.$searchInput.on('input', (e)=> {
            let $input = $(e.currentTarget)
            let value = $input.val().trim()
            if(value === '') { return }
        
            if(this.timer) { clearTimeout(this.timer) }
        
            this.timer = setTimeout(() => {
                this.search(value).then((result)=> {
                    timer = undefined
                    if(result.length !== 0) {
                        console.log(result)
        
                        console.log(result.map(function(e){
                            return e.name
                        }).join(','))            
                        this.$output.text(result.map( r => {return r.name}).join(','))
                    }else {
                        this.$output.text('找不到')
                    }
                })
            },300)
        })
    },
    renderPage1() {
        $.get('../assets/songs.json').then(res =>  {
            let items = res
            items.forEach(i => {
                let $li = $(`
                            <li>
                                
                                <a class="iconfont" href="./song.html?id=${i.id}">
                                    <h4>${i.name}</h4>
                                    <p>作者-歌曲</p>
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-playCircled"></use>
                                    </svg>
                                </a>
                            </li>
                        `)
                this.$topLists.append($li)
            })
            this.$loading.remove()
        })        
    },
    search(keyword) {
        return new Promise( (resolve, reject) =>{
            let database = [
                { "id": 1, "name": "appble"},
                { "id": 2, "name": "banana"},
                { "id": 3, "name": "orange"},
                { "id": 4, "name": "water"},
                { "id": 5, "name": "wwe"},
                { "id": 6, "name": "大声道e"}
            ]
            let result = database.filter(item => {
                return item.name.indexOf(keyword) >=0
            })
            
            setTimeout(() => {
                resolve(result)
            },(Math.random()*200+1000))
        })
        
    
    }
    
}
Index.init()
// let $topLists = $('.lastestMusic .topLists')
// let $loading = $('.js-loading')
// $.get('../assets/songs.json').then(res =>  {
//     let items = res
//     items.forEach(i => {
//         let $li = $(`
//                     <li>
                        
//                         <a class="iconfont" href="./song.html?id=${i.id}">
//                             <h4>${i.name}</h4>
//                             <p>作者-歌曲</p>
//                             <svg class="icon" aria-hidden="true">
//                                 <use xlink:href="#icon-playCircled"></use>
//                             </svg>
//                         </a>
//                     </li>
//                 `)
//         $topLists.append($li)
//     })
//     $loading.remove()
// })

// $('.tabNav').on("click",'ul.tabItems>li',function(e){
//     let $li = $(e.currentTarget).addClass('active')
//     $li.siblings().removeClass('active')
//     let index = $li.index()
//     $li.trigger('tabChange', index)
//     $('.tabContainer > li').eq(index).addClass('active')
//     .siblings().removeClass('active')

// })
// $('.tabNav').on('tabChange', function(e, index) {
//     let $li = $('.tabContainer > li').eq(index)
//     console.log(e,index)
//     if($li.attr('data-downloaded') === 'yes') return

//     if(index === 1) {
//         $.get("../assets/page2.json").then( res => {
//             console.log(res)
//             $li.attr('data-downloaded','yes')
//             //json 数据设置样式
//         })
//     }else if (index === 2) {
//         $.get("../assets/page3.json").then( res => {
//             console.log(res)
//             $li.attr('data-downloaded','yes')
//             //json 数据设置样式
//         })
//     }
// })

// let timer = undefined
// $('.searchInput').on('input', (e)=> {
//     let $input = $(e.currentTarget)
//     let value = $input.val().trim()
//     if(value === '') { return }

//     if(timer) { clearTimeout(timer) }

//     timer = setTimeout(function() {
//         search(value).then((result)=> {
//             timer = undefined
//             if(result.length !== 0) {
//                 console.log(result)

//                 console.log(result.map(function(e){
//                     return e.name
//                 }).join(','))
                
//                 $('.output').text(result.map( r => {return r.name}).join(','))
//             }else {
//                 $('.output').text('找不到')
//             }
//         })
//     })
// })

// function search(keyword) {
//     return new Promise( (resolve, reject) =>{
//         var database = [
//             { "id": 1, "name": "appble"},
//             { "id": 2, "name": "banana"},
//             { "id": 3, "name": "orange"},
//             { "id": 4, "name": "water"},
//             { "id": 5, "name": "wwe"},
//             { "id": 6, "name": "大声道e"}
//         ]
//         let result = database.filter(item => {
//             return item.name.indexOf(keyword) >=0
//         })
        
//         setTimeout(() => {
//             console.log('soudao'+keyword+'的结果')
//             console.log('---',result,"---")
//             resolve(result)
//         },(Math.random()*200+1000))
//     })
    

// }