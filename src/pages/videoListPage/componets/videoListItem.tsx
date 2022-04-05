import React, { useMemo, useEffect, memo } from 'react'
import type {Node} from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity, Image, FlatList, Text } from 'react-native'
import { VideoItem } from '../config'
import { pauseIcon, playIcon, checkIcon, checkSelectIcon } from '../../../assets/index'

export type VideoListItemProps = {
	data: VideoItem // 数据
	videoPlay: boolean // 是否为播放状态
	select: boolean // 是否为选中状态
	setVideoPlay: (id: number) => void // 改变播放状态
	setSelect: (id: number) => void // 改变选中状态
}

const VideoListItem: (props: VideoListItemProps) => Node = (props) => {

	const playImg = useMemo(() => props.videoPlay ? pauseIcon : playIcon, [props.videoPlay])

	const [selectImg ,selectImgStyle, selectContainerStyle] = useMemo(() => {
		if (props.select) { // 根据选中的状态使用不同的图片样式
			return [checkSelectIcon, [styles.checkIcon, styles.checkSelectIcon], [styles.container, styles.containerSelect]]
		} else {
			return [checkIcon, styles.checkIcon, styles.container]
		}
	}, [props.select])
	// 改变播放状态
	const _setVideoPlay = () => {
		const { setVideoPlay, data: { id }} = props
		setVideoPlay(id)
	}
	// 改变选中状态
	const _setSelect = () => {
		const { setSelect, data: { id }} = props
		setSelect(id)
	}

	return (<View style={selectContainerStyle}>
		<TouchableOpacity onPress={_setVideoPlay} style={styles.topContent}>
			<Image style={styles.videoIcon} source={playImg} />
		</TouchableOpacity>
		<View style={styles.bottomContent}>
			<Text >
				{props.data.title + '\r\n' + props.data.describe}
			</Text>
			<TouchableOpacity onPress={_setSelect} style={selectImgStyle}>
				<Image style={styles.videoIcon} source={selectImg} />
			</TouchableOpacity>
		</View>
	</View>)
}

const { width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
	container: {
		paddingTop: 18,
		width: '100%',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	containerSelect: {
		backgroundColor: 'rgba(0, 0, 0, 0.08)'
	},
	topContent: {
		justifyContent: 'center',
		alignItems: 'center',
		width: width - 26,
		height: 128,
		borderWidth: 1.6,
		borderColor: '#000',
		borderRadius: 6.4
	},
	videoIcon: {
		width: 42,
		height: 42,
	},
	bottomContent: {
		width: width - 26,
		height: 60,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	describe: {
		fontSize: 11.2,
		lineHeight: 16,
		color: '#000'
	},
	checkIcon: {
		width: 42,
		height: 42,
		borderWidth: 1.6,
		borderRadius: 6.4,
		borderColor: '#000',
		justifyContent: 'center',
		alignItems: 'center',
	},
	checkSelectIcon: {
		backgroundColor: '#000'
	}
})

export default memo(VideoListItem)