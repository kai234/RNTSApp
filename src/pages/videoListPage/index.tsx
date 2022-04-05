import React, { useState, useEffect, memo } from 'react'
import type {Node} from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, Text } from 'react-native'
import { VideoItem, datalist } from './config'
import VideoListItem, { VideoListItemProps} from './componets/videoListItem'

 // 主页面page
const VideoListPage: () => Node = () => {
	let init = false
	// 后端返回的列表数据
	const [videoLists, setVideoLists] = useState<VideoItem[]>([])
	// 选中的列表数据
	const [selectLists, setSelectLists] = useState<number[]>([])
	// 当前播放的列表数据
	const [videoPlay, setVideoPlay] = useState<number|null>([null])

	// 改变选择的列表数据
	const setChangeSelectLists = (id:number) => {
		const index: number = selectLists.indexOf(id)
		if (index == -1) {
			// 选中
			const data = [...selectLists]
			data.push(id)
			setSelectLists(data)
		} else {
			// 取消选中
			const data = [...selectLists]
			data.splice(index, 1)
			setSelectLists(data)
		}
	}

	// 改变播放的列表数据
	const setChangeVideoPlay = (id:number) => {
		if (videoPlay == id) {
			// 暂停
			setVideoPlay(null)
		} else {
			// 播放
			setVideoPlay(id)
		}
	}

	useEffect(() => {
		// 初始化获取假数据
		if (videoLists.length == 0 || init == false) {
			setVideoLists(datalist)
			init == true
		}
	}, [])

	const _renderItem = (data: { item: VideoItem}) => {
		const item = data.item
		const videoListItemProps: VideoListItemProps = {
			data: item,
			select: selectLists.includes(item.id),
			videoPlay: videoPlay == item.id,
			setVideoPlay: setChangeVideoPlay,
			setSelect: setChangeSelectLists
		}
		return <VideoListItem {...videoListItemProps}/>
	}

	const _renderLine = () => {
		return <View style={styles.line} />
	}

	return (<>
			<View style={styles.header}>
				<Text style={styles.headerTx}>template</Text>
			</View>
			<FlatList 
				data={videoLists}
				renderItem={_renderItem}
				keyExtractor={(item: VideoItem) => item.id}
				extraData={{videoPlay, selectLists}}
				ItemSeparatorComponent={_renderLine}
			/>
		</>)
}

const styles = StyleSheet.create({
	header: {
		width: '100%',
		height: 60,
		justifyContent: 'center',
		alignItems: 'center' 
	},
	headerTx: {
		fontSize: 14,
		color: '#000',
		fontWeight: 'bold'
	},
	line: {
		height: 1.6,
		backgroundColor: '#000',
	}
  });

  export default VideoListPage



