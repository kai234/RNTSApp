type VideoItem = {
	id: number
	title: string
	describe: string
}
// 生成假数据列表
var datalist: VideoItem[] = Array.from({ length: 100 }, (v, index) => {
	return {
		id: index,
		title: 'Template Name' + index,
		describe: '8 SHOT, 15.0s',
	}
})

export {
	datalist
}
export type { VideoItem }
