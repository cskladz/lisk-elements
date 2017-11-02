/*
 * Copyright © 2017 Lisk Foundation
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with the Lisk Foundation,
 * no part of this software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE file.
 *
 * Removal or modification of this copyright notice is prohibited.
 *
 */
import cryptoModule from '../crypto';
import { MULTISIGNATURE_FEE } from '../constants';
import { prepareTransaction } from './utils';
import { getTimeWithOffset } from './utils/time';
/**
 * @method registerMultisignatureAccount
 * @param {Object} Object - Object
 * @param {String} Object.secret
 * @param {String} Object.secondSecret
 * @param {Array<String>} Object.keysgroup
 * @param {Number} Object.lifetime
 * @param {Number} Object.min
 * @param {Number} Object.timeOffset
 *
 * @return {Object}
 */

export default function registerMultisignatureAccount({
	secret,
	secondSecret,
	keysgroup,
	lifetime,
	min,
	timeOffset,
}) {
	const keys = cryptoModule.getKeys(secret);
	const keygroupFees = keysgroup.length + 1;

	const transaction = {
		type: 4,
		amount: '0',
		fee: (MULTISIGNATURE_FEE * keygroupFees).toString(),
		recipientId: null,
		senderPublicKey: keys.publicKey,
		timestamp: getTimeWithOffset(timeOffset),
		asset: {
			multisignature: {
				min,
				lifetime,
				keysgroup,
			},
		},
	};

	return prepareTransaction(transaction, secret, secondSecret);
}