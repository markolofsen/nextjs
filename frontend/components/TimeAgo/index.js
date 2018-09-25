import TimeAgo from 'react-timeago';

import lang_en from 'react-timeago/lib/language-strings/en'
import lang_ru from 'react-timeago/lib/language-strings/ru'
import lang_es from 'react-timeago/lib/language-strings/es'
import lang_de from 'react-timeago/lib/language-strings/de'
import lang_fr from 'react-timeago/lib/language-strings/fr'
import lang_cn from 'react-timeago/lib/language-strings/zh-CN'
import lang_id from 'react-timeago/lib/language-strings/id'

import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'



import { I18n } from '../../i18n'


function TimeAgoComponent(props, store) {
  const { classes, prefix } = props;
	const lang = I18n ? I18n.language : 'en'

	let formatter = buildFormatter(lang_en)
	if(lang == 'ru') formatter = buildFormatter(lang_ru)
	if(lang == 'de') formatter = buildFormatter(lang_de)
	if(lang == 'fr') formatter = buildFormatter(lang_fr)
	if(lang == 'es') formatter = buildFormatter(lang_es)
  if(lang == 'cn') formatter = buildFormatter(lang_cn)
  if(lang == 'id') formatter = buildFormatter(lang_id)

  return (
		<span>
			{prefix && `${prefix} `}<TimeAgo date={props.date} formatter={formatter} />
		</span>
  );
}



export default TimeAgoComponent;
