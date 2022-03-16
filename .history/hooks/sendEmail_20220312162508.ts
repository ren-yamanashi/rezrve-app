import { init } from 'emailjs-com';
import emailjs from "emailjs-com"

function onclickSendMail(){
	// emailjsのUser_IDを使って初期化
	init(process.env.GATSBY_USER_ID);

	// 環境変数からService_IDとTemplate_IDを取得する。
	const emailjsServiceId = process.env.GATSBY_EMAILJS_SERVICE_ID;
	const emailjsTemplateId = process.env.GATSBY_EMAILJS_TEMPLATE_ID;

	// emailjsのテンプレートに渡すパラメータを宣言
	const templateParams = {
		from_name: "テスト",
		to_teacher: "テスト講師",
		to_student:"テスト生徒",
		to_date:"1999/1/1"
	};

	// ServiceId,Template_ID,テンプレートに渡すパラメータを引数にemailjsを呼び出し
	emailjs.send(emailjsServiceId,emailjsTemplateId, templateParams).
	then(()=>{
	  // do something
	});
}