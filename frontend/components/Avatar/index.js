import React, {Component} from 'react';
import PropTypes from 'prop-types';

/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'

/*
 * LIBS
 */
import Avatar from 'avataaars';


@withStyles(styles)
class AvatarBlock extends Component {

	randomChoice = arr => {
		const randIndex = Math.floor(Math.random() * arr.length);
		return arr[randIndex];
	};

	randomAvatar() {

		const {size} = this.props
		const size_ = size ? size : 50

		const topType = [
			'NoHair','Eyepatch','Hat','Hijab','Turban','WinterHat1','WinterHat2','WinterHat3','WinterHat4','LongHairBigHair','LongHairBob','LongHairBun','LongHairCurly','LongHairCurvy','LongHairDreads','LongHairFrida','LongHairFro','LongHairFroBand','LongHairNotTooLong','LongHairShavedSides','LongHairMiaWallace','LongHairStraight','LongHairStraight2','LongHairStraightStrand','ShortHairDreads01','ShortHairDreads02','ShortHairFrizzle','ShortHairShaggyMullet','ShortHairShortCurly','ShortHairShortFlat','ShortHairShortRound','ShortHairShortWaved','ShortHairSides','ShortHairTheCaesar','ShortHairTheCaesarSidePart']

		const hairColor = ['Auburn','Black','Blonde','Brown','BrownDark','BlondeGolden','PastelPink','Platinum','Red','SilverGray']

		const facialHairType = ['Blank','BeardMedium','BeardLight','BeardMagestic','MoustacheFancy','MoustacheMagnum']

		const skinColor = ['Tanned','Yellow','Light','Pale','DarkBrown','Black','Brown','Light']

		return <Avatar
		  avatarStyle='Circle'
		  topType={this.randomChoice(topType)}
		  accessoriesType='Blank'
			hatColor=''
			hairColor={this.randomChoice(hairColor)}
		  facialHairType={this.randomChoice(facialHairType)}
		  facialHairColor='BrownDark'
		  clotheType='Overall'
		  clotheColor='Blue01'
		  eyeType='Cry'
		  eyebrowType='FlatNatural'
		  mouthType='Tongue'
		  skinColor={this.randomChoice(skinColor)}
			style={{
				width: size_,
				height: size_
			}}
		/>

	}

	render() {

		return (
			<div>
				{this.randomAvatar()}
			</div>
		)
	}
}

AvatarBlock.propTypes = {
	// classes: PropTypes.object.isRequired,
	// text: PropTypes.string.isRequired
};

export default AvatarBlock;
