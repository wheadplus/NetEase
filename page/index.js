const Index = {
    init(){
        this.$topLists = $('.lastestMusic .topLists')
        this.$loading = $('.js-loading')
        this.$tabNav = $('.tabNav')
        this.$searchInput = $('.searchInput')
        this.$output = $('.output')
        this.$outputHelp = $('.outHelp')
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
            // console.log(e,index)
            if($li.attr('data-downloaded') === 'yes') return

            if(index === 1) {
                $.get("../assets/page2.json").then( res => {
                    // console.log(res)
                    $li.attr('data-downloaded','yes')
                    //json 数据设置样式
                })
            }else if (index === 2) {
                $.get("../assets/page3.json").then( res => {
                    // console.log(res)
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
                        
                        let arr = result.map(function(e){
                            return e.name
                        })
                        console.log("xxxx",this.$outputHelp)
                        $(".searchTip").css("display","none")
                        this.$outputHelp.css( "display", "block" ) 
                     
                        arr.forEach(i => {
                            let $li = $(`
                                <li>      
                                    <a class="iconfont" href="./song.html?id=${1}">
                                        <h4>${i}</h4>
                                        <p>作者-歌曲</p>
                                        <svg class="icon" aria-hidden="true">
                                            <use xlink:href="#icon-playCircled"></use>
                                        </svg>
                                    </a>
                                </li>
                            `)
                            this.$output.html($li)
                            
                        })               
                        
                    }else {
                        this.$output.html($(`<li class="notFound">试试apple,banana.（ps:数据库只有一首歌）</li>`))
                        this.$outputHelp.css( "display", "block" ) 
                        $(".searchTip").css("display","none")
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
                { "id": 1, "name": "apple"},
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
