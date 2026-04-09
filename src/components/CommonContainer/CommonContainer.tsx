import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { genericStyles } from '../../constants'

type Props = {
  children?: React.ReactNode
}

const CommonContainer = ({ children }: Props) => {
  return (
    <SafeAreaView style={genericStyles.container}>
        {children}
    </SafeAreaView>
  )
}

export default CommonContainer

const styles = StyleSheet.create({})