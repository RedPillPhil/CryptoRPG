//=============================================================================
// MPP_CharacterMake_Op1.js
//=============================================================================
// Copyright (c) 2017-2024 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc キャラクターメイク画面(タイプ1)を呼び出せるようになります。
 * @author 木星ペンギン
 * @url http://woodpenguin.web.fc2.com/MV_Plugin/CharacterMake.html
 *
 * @base MPP_CharacterMake
 * @orderAfter MPP_CharacterMake
 *
 * @help [version 2.0.1]
 * - このプラグインはRPGツクールMZ用です。
 * - キャラクターメイク画面(タイプ1)を呼び出せるようになります。
 * - This plugin is Japanese help only.
 * 
 * ▼ パーツの簡易設定
 *  - テストプレイ中にキャラクターメイク画面を呼び出し、そこでF9キーを押すと、
 *    デベロッパーツールのConsole画面に現在のキャラクターメイク画像の
 *    コマンド名が表示されます。
 *    （デベロッパーツールはF8キーで起動できます）
 *  - [デフォルトパーツ]をアクターのメモ欄にコピー＆ペーストすると、
 *    アクターの初期グラフィックがキャラクターメイクで作った画像になります。
 *  - [パーツ毎のコマンド]を武器、防具、職業のメモ欄にコピー＆ペーストすると、
 *    それらのオブジェクトを持つアクターのパーツが変更されます。
 *  - 色に関するコマンドはどちらも共通です。
 * 
 * ▼ パーツの固定
 *  - 職業のメモ欄にパーツや色が設定されている場合、それらは固定値扱いとなり、
 *    キャラクターメイク画面で変更できなくなります。
 *  - <GeneParts PARTS:id>コマンドのidに0を指定した場合、
 *    パーツなしが固定値となります。
 * 
 * ▼ 各パラメータ詳細
 *  〇 基礎タイプ
 *   Male   : 男性
 *   Female : 女性
 *   Kid    : 子供
 * 
 *  〇 パーツ名
 *   Face      : 顔             FrontHair  : 前髪
 *   RearHair  : 後髪           Beard      : ヒゲ
 *   Ears      : 耳             Eyes       : 目
 *   Eyebrows  : 眉             Nose       : 鼻
 *   Mouth     : 口             FacialMark : 紋様
 *   BeastEars : 獣耳           Tail       : 尻尾
 *   Wing      : 羽             Clothing   : 服
 *   Cloak     : マント         AccA       : 装身具1
 *   AccB      : 装身具2        Glasses    : メガネ
 * 
 *  〇 色番号
 *   1  : 肌の色                  2  : 目の色
 *   3  : 毛の色                  4  : 後髪のサブカラー
 *   5  : 紋様の色                6  : 獣耳の色
 *   7  : 服のメインカラー        8  : 服のサブカラー1
 *   9  : 服のサブカラー2         10 : 服のサブカラー3
 *   11 : マントのメインカラー    12 : マントのサブカラー1
 *   13 : 装身具1のメインカラー   14 : 装身具1のサブカラー1
 *   15 : 装身具1のサブカラー2    16 : 装身具2のメインカラー
 *   17 : 装身具2のサブカラー1    18 : 装身具2のサブカラー2
 *   19 : 装身具2のサブカラー3    20 : メガネのメインカラー
 *   21 : メガネのサブカラー1     22 : メガネのサブカラー2
 *   23 : 尻尾の色                24 : 羽の色
 * 
 * ▼ 補足
 *  - 本プラグインにはパーツの位置(オフセット)を設定する機能はありません。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @param Parts List
 *      @text パーツ並び順
 *      @desc エディット画面のパーツの並び順
 *      @type select[]
 *          @option 顔
 *              @value Face
 *          @option 前髪
 *              @value FrontHair
 *          @option 後髪
 *              @value RearHair
 *          @option ヒゲ
 *              @value Beard
 *          @option 耳
 *              @value Ears
 *          @option 目
 *              @value Eyes
 *          @option 眉
 *              @value Eyebrows
 *          @option 鼻
 *              @value Nose
 *          @option 口
 *              @value Mouth
 *          @option 紋様
 *              @value FacialMark
 *          @option 獣耳
 *              @value BeastEars
 *          @option 尻尾
 *              @value Tail
 *          @option 羽
 *              @value Wing
 *          @option 服
 *              @value Clothing
 *          @option マント
 *              @value Cloak
 *          @option 装身具1
 *              @value AccA
 *          @option 装身具2
 *              @value AccB
 *          @option メガネ
 *              @value Glasses
 *      @default ["Face","FrontHair","RearHair","Beard","Ears","Eyes","Eyebrows","Nose","Mouth","FacialMark","BeastEars","Tail","Wing","Clothing","Cloak","AccA","AccB","Glasses"]
 *
 *  @param Preview List
 *      @text プレビュー表示
 *      @desc 
 *      @type select[]
 *          @option 歩行グラ
 *              @value Walk turn
 *          @option 歩行グラ(正面のみ)
 *              @value Walk front
 *          @option 歩行グラ(4方向)
 *              @value Walk 4dir
 *          @option 歩行グラ(4方向/1.5枠)
 *              @value Walk 4dir wide
 *          @option 戦闘グラ
 *              @value Battler
 *          @option 顔グラ
 *              @value Face
 *      @default ["Face","Walk turn","Battler"]
 * 
 *  @param Change Kind?
 *      @text 基礎タイプ変更の有効/無効
 *      @desc 
 *      @type boolean
 *      @default true
 * 
 *  @param Color Custom?
 *      @text 色のカスタムの有効/無効
 *      @desc 
 *      @type boolean
 *      @default true
 * 
 *  @param Confirmation Scene?
 *      @text 確認画面の有効/無効
 *      @desc 
 *      @type boolean
 *      @default true
 * 
 *  @param Key Help Window Background Type
 *      @text キーヘルプ背景
 *      @desc 
 *      @type select
 *          @option ウィンドウ
 *              @value 0
 *          @option 暗くする
 *              @value 1
 *          @option 透明
 *              @value 2
 *      @default 0
 *
 *  @param Background
 *      @text 背景
 *      @desc 
 *      @type struct<Background>
 *      @default {"Image":"","ScrollX":"0","ScrollY":"0"}
 *
 *  @param Random Parts
 *      @text ランダムで変更されるパーツ
 *      @desc 
 *      @type struct<PartsBoolean>
 *      @default {"Face":"true","FrontHair":"true","RearHair":"true","Beard":"true","Ears":"false","Eyes":"true","Eyebrows":"true","Nose":"true","Mouth":"true","FacialMark":"true","BeastEars":"false","Tail":"false","Wing":"false","Clothing":"true","Cloak":"false","AccA":"true","AccB":"true","Glasses":"true"}
 * 
 *  @param Parts Weights
 *      @text パーツ重み
 *      @desc ランダム使用時にパーツごとの出やすさを設定。
 *      @type struct<PartsWeight>[]
 *      @default ["{\"Parts Name\":\"FrontHair\",\"Id\":\"0\",\"Weight\":\"0\"}","{\"Parts Name\":\"RearHair\",\"Id\":\"0\",\"Weight\":\"0\"}","{\"Parts Name\":\"Beard\",\"Id\":\"0\",\"Weight\":\"4\"}","{\"Parts Name\":\"FacialMark\",\"Id\":\"0\",\"Weight\":\"8\"}","{\"Parts Name\":\"Clothing\",\"Id\":\"0\",\"Weight\":\"0\"}","{\"Parts Name\":\"AccA\",\"Id\":\"0\",\"Weight\":\"8\"}","{\"Parts Name\":\"AccB\",\"Id\":\"0\",\"Weight\":\"8\"}","{\"Parts Name\":\"Glasses\",\"Id\":\"0\",\"Weight\":\"8\"}"]
 *      @parent Random Parts
 * 
 *  @param Random Colors
 *      @text ランダムで変更される色
 *      @desc 
 *      @type struct<ColorsBoolean>
 *      @default {"Color1":"false","Color2":"false","Color3":"true","Color4":"false","Color5":"false","Color6":"false","Color7":"true","Color8":"true","Color9":"false","Color10":"false","Color11":"false","Color12":"false","Color13":"true","Color14":"false","Color15":"false","Color16":"true","Color17":"false","Color18":"false","Color19":"false","Color20":"true","Color21":"false","Color22":"false","Color23":"false","Color24":"false"}
 *
 *  @param Random SE
 *      @text ランダムSE
 *      @desc 
 *      @type struct<SE>
 *      @default {"name":"Decision1","volume":"90","pitch":"100","pan":"0"}
 *
 *  @param === Terms ===
 *      @text === 用語 ===
 * 
 *  @param KeyHelp
 *      @text 用語[キーヘルプ]
 *      @desc 制御文字使用可能
 *      @type struct<KeyHelp>
 *      @default {"Random":"Shift: ランダム","PageChange":"Page Up Dn: 性別変更"}
 *      @parent === Terms ===
 * 
 *  @param Command
 *      @text 用語[コマンド]
 *      @desc 
 *      @type struct<Command>
 *      @default {"Yes":"はい","No":"いいえ","Default":"元に戻す","Ok":"決定","Custom":"カスタム","Bright":"ブライト","Normal":"ノーマル","Dark":"ダーク"}
 *      @parent === Terms ===
 * 
 *  @param Message
 *      @text 用語[メッセージ]
 *      @desc 
 *      @type struct<Message>
 *      @default {"Confirmation":"このグラフィックでよろしいですか？"}
 *      @parent === Terms ===
 * 
 *  @param Kinds
 *      @text 用語[基礎タイプ]
 *      @desc 
 *      @type struct<Kind>[]
 *      @default ["{\"Type\":\"Male\",\"Text\":\"男性\"}","{\"Type\":\"Female\",\"Text\":\"女性\"}","{\"Type\":\"Kid\",\"Text\":\"子供\"}"]
 *      @parent === Terms ===
 * 
 *  @param Parts
 *      @text 用語[パーツ]
 *      @desc
 *      @type struct<Parts>
 *      @default {"Face":"顔","FrontHair":"前髪","RearHair":"後髪","Beard":"ヒゲ","Ears":"耳","Eyes":"目","Eyebrows":"眉","Nose":"鼻","Mouth":"口","FacialMark":"紋様","BeastEars":"獣耳","Tail":"尻尾","Wing":"羽","Clothing":"服","Cloak":"マント","AccA":"装身具1","AccB":"装身具2","Glasses":"メガネ"}
 *      @parent === Terms ===
 * 
 *  @param Colors
 *      @text 用語[色]
 *      @desc
 *      @type struct<Colors>
 *      @default {"Color1":"肌の色","Color2":"目の色","Color3":"毛の色","Color4":"サブカラー","Color5":"紋様の色","Color6":"獣耳の色","Color7":"メインカラー","Color8":"サブカラー1","Color9":"サブカラー2","Color10":"サブカラー3","Color11":"メインカラー","Color12":"サブカラー1","Color13":"メインカラー","Color14":"サブカラー1","Color15":"サブカラー2","Color16":"メインカラー","Color17":"サブカラー1","Color18":"サブカラー2","Color19":"サブカラー3","Color20":"メインカラー","Color21":"サブカラー1","Color22":"サブカラー2","Color23":"尻尾の色","Color24":"羽の色"}
 *      @parent === Terms ===
 * 
 */

/*~struct~PartsBoolean:
 *  @param Face
 *      @text 顔
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param FrontHair
 *      @text 前髪
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param RearHair
 *      @text 後髪
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Beard
 *      @text ヒゲ
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Ears
 *      @text 耳
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Eyes
 *      @text 目
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Eyebrows
 *      @text 眉
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Nose
 *      @text 鼻
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Mouth
 *      @text 口
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param FacialMark
 *      @text 紋様
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param BeastEars
 *      @text 獣耳
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Tail
 *      @text 尻尾
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Wing
 *      @text 羽
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Clothing
 *      @text 服
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Cloak
 *      @text マント
 *      @desc 
 *      @type boolean
 *      @default tfalse
 *
 *  @param AccA
 *      @text 装身具1
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param AccB
 *      @text 装身具2
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Glasses
 *      @text メガネ
 *      @desc 
 *      @type boolean
 *      @default true
 *
 */

/*~struct~PartsWeight:
 *  @param Parts Name
 *      @text パーツ名
 *      @desc 
 *      @type select
 *          @option 顔
 *              @value Face
 *          @option 前髪
 *              @value FrontHair
 *          @option 後髪
 *              @value RearHair
 *          @option ヒゲ
 *              @value Beard
 *          @option 耳
 *              @value Ears
 *          @option 目
 *              @value Eyes
 *          @option 眉
 *              @value Eyebrows
 *          @option 鼻
 *              @value Nose
 *          @option 口
 *              @value Mouth
 *          @option 紋様
 *              @value FacialMark
 *          @option 獣耳
 *              @value BeastEars
 *          @option 尻尾
 *              @value Tail
 *          @option 羽
 *              @value Wing
 *          @option 服
 *              @value Clothing
 *          @option マント
 *              @value Cloak
 *          @option 装身具1
 *              @value AccA
 *          @option 装身具2
 *              @value AccB
 *          @option メガネ
 *              @value Glasses
 *      @default Face
 *
 *  @param Id
 *      @text パーツID
 *      @desc
 *      @type number
 *          @min 0
 *          @max 999999
 *      @default 0
 *
 *  @param Weight
 *      @text 重み
 *      @desc 0:出現しない /  数値が大きいほど出やすい
 *      @type number
 *          @min 0
 *          @max 100
 *      @default 1
 *
 */

/*~struct~ColorsBoolean:
 *  @param Color1
 *      @text 肌の色
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Color2
 *      @text 目の色
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Color3
 *      @text 毛の色
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Color4
 *      @text 後髪のサブカラー
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Color5
 *      @text 紋様の色
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Color6
 *      @text 獣耳の色
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Color7
 *      @text 服のメインカラー
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Color8
 *      @text 服のサブカラー1
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Color9
 *      @text 服のサブカラー2
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Color10
 *      @text 服のサブカラー3
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Color11
 *      @text マントのメインカラー
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Color12
 *      @text マントのサブカラー1
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Color13
 *      @text 装身具1のメインカラー
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Color14
 *      @text 装身具1のサブカラー1
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Color15
 *      @text 装身具1のサブカラー2
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Color16
 *      @text 装身具2のメインカラー
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Color17
 *      @text 装身具2のサブカラー1
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Color18
 *      @text 装身具2のサブカラー2
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Color19
 *      @text 装身具2のサブカラー3
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Color20
 *      @text メガネのメインカラー
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Color21
 *      @text メガネのサブカラー1
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Color22
 *      @text メガネのサブカラー2
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Color23
 *      @text 尻尾の色
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Color24
 *      @text 羽の色
 *      @desc 
 *      @type boolean
 *      @default false
 *
 */

/*~struct~SE:
 *  @param name
 *      @text ファイル名
 *      @desc 
 *      @type file
 *          @require 1
 *          @dir audio/se
 *      @default 
 *
 *  @param volume
 *      @text 音量
 *      @desc
 *      @type number
 *          @min 0
 *          @max 100
 *      @default 90
 *
 *  @param pitch
 *      @text ピッチ
 *      @desc
 *      @type number
 *          @min 50
 *          @max 150
 *      @default 100
 *
 *  @param pan
 *      @text 位相
 *      @desc
 *      @type number
 *          @min -100
 *          @max 100
 *      @default 0
 *
 */

/*~struct~Background:
 *  @param Image
 *      @text 画像
 *      @type file
 *          @require 1
 *          @dir img/pictures
 *      @default
 *
 *  @param ScrollX
 *      @text スクロール X
 *      @type number
 *          @min -150
 *          @max 150
 *      @default 0
 *
 *  @param ScrollY
 *      @text スクロール X
 *      @type number
 *          @min -150
 *          @max 150
 *      @default 0
 *
 */

/*~struct~KeyHelp:
 *  @param Random
 *      @default Shift: ランダム
 *
 *  @param PageChange
 *      @default Page Up Dn: 性別変更
 *
 */

/*~struct~Command:
 *  @param Yes
 *      @default はい
 *
 *  @param No
 *      @default いいえ
 *
 *  @param Default
 *      @default 元に戻す
 *
 *  @param Ok
 *      @default 決定
 *
 *  @param Custom
 *      @default カスタム
 * 
 */

/*~struct~Message:
 *  @param Confirmation
 *      @default このグラフィックでよろしいですか？
 *
 */

/*~struct~Kind:
 *  @param Type
 *      @text 基礎タイプ
 *      @default 
 *
 *  @param Text
 *      @text 用語
 *      @default 
 *
 */

/*~struct~Parts:
 *  @param Face
 *      @desc 顔
 *      @default 顔
 *
 *  @param FrontHair
 *      @desc 前髪
 *      @default 前髪
 *
 *  @param RearHair
 *      @desc 後髪
 *      @default 後髪
 *
 *  @param Beard
 *      @desc ヒゲ
 *      @default ヒゲ
 *
 *  @param Ears
 *      @desc 耳
 *      @default 耳
 *
 *  @param Eyes
 *      @desc 目
 *      @default 目
 *
 *  @param Eyebrows
 *      @desc 眉
 *      @default 眉
 *
 *  @param Nose
 *      @desc 鼻
 *      @default 鼻
 *
 *  @param Mouth
 *      @desc 口
 *      @default 口
 *
 *  @param FacialMark
 *      @desc 紋様
 *      @default 紋様
 *
 *  @param BeastEars
 *      @desc 獣耳
 *      @default 獣耳
 *
 *  @param Tail
 *      @desc 尻尾
 *      @default 尻尾
 *
 *  @param Wing
 *      @desc 羽
 *      @default 羽
 *
 *  @param Clothing
 *      @desc 服
 *      @default 服
 *
 *  @param Cloak
 *      @desc マント
 *      @default マント
 *
 *  @param AccA
 *      @desc 装身具1
 *      @default 装身具1
 *
 *  @param AccB
 *      @desc 装身具2
 *      @default 装身具2
 *
 *  @param Glasses
 *      @desc メガネ
 *      @default メガネ
 *
 */

/*~struct~Colors:
 *  @param Color1
 *      @desc 肌の色
 *      @default 肌の色
 *
 *  @param Color2
 *      @desc 目の色
 *      @default 目の色
 *
 *  @param Color3
 *      @desc 毛の色
 *      @default 毛の色
 *
 *  @param Color4
 *      @desc 後髪のサブカラー
 *      @default サブカラー
 *
 *  @param Color5
 *      @desc 紋様の色
 *      @default 紋様の色
 *
 *  @param Color6
 *      @desc 獣耳の色
 *      @default 獣耳の色
 *
 *  @param Color7
 *      @desc 服のメインカラー
 *      @default メインカラー
 *
 *  @param Color8
 *      @desc 服のサブカラー1
 *      @default サブカラー1
 *
 *  @param Color9
 *      @desc 服のサブカラー2
 *      @default サブカラー2
 *
 *  @param Color10
 *      @desc 服のサブカラー3
 *      @default サブカラー3
 *
 *  @param Color11
 *      @desc マントのメインカラー
 *      @default メインカラー
 *
 *  @param Color12
 *      @desc マントのサブカラー1
 *      @default サブカラー1
 *
 *  @param Color13
 *      @desc 装身具1のメインカラー
 *      @default メインカラー
 *
 *  @param Color14
 *      @desc 装身具1のサブカラー1
 *      @default サブカラー1
 *
 *  @param Color15
 *      @desc 装身具1のサブカラー2
 *      @default サブカラー2
 *
 *  @param Color16
 *      @desc 装身具2のメインカラー
 *      @default メインカラー
 *
 *  @param Color17
 *      @desc 装身具2のサブカラー1
 *      @default サブカラー1
 *
 *  @param Color18
 *      @desc 装身具2のサブカラー2
 *      @default サブカラー2
 *
 *  @param Color19
 *      @desc 装身具2のサブカラー3
 *      @default サブカラー3
 *
 *  @param Color20
 *      @desc メガネのメインカラー
 *      @default メインカラー
 *
 *  @param Color21
 *      @desc メガネのサブカラー1
 *      @default サブカラー1
 *
 *  @param Color22
 *      @desc メガネのサブカラー2
 *      @default サブカラー2
 *
 *  @param Color23
 *      @desc 尻尾の色
 *      @default 尻尾の色
 *
 *  @param Color24
 *      @desc 羽の色
 *      @default 羽の色
 *
 */

(() => {
    'use strict';

    const pluginName = 'MPP_CharacterMake_Op1';
    const basePluginName = 'MPP_CharacterMake';
    
    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const paramReviver = (key, value) => {
        try {
            return JSON.parse(value, paramReviver);
        } catch (e) {
            return value;
        }
    };
    const param_PartsList = JSON.parse(parameters['Parts List'] || '[]');
    const param_PreviewList = JSON.parse(parameters['Preview List'] || '[]');
    const param_ChangeKind = parameters['Change Kind?'] === 'true';
    const param_ColorCustom = parameters['Color Custom?'] === 'true';
    const param_ConfirmationScene = parameters['Confirmation Scene?'] === 'true';
    const param_KeyHelpWindowBackgroundType = Number(parameters['Key Help Window Background Type'] || 0);
    const param_Background = JSON.parse(parameters['Background'] || '{}', paramReviver);
    const param_RandomParts = JSON.parse(parameters['Random Parts'] || '{}', paramReviver);
    const param_PartsWeights = JSON.parse(parameters['Parts Weights'] || '[]', paramReviver);
    const param_RandomColors = JSON.parse(parameters['Random Colors'] || '{}', paramReviver);
    const param_RandomSE = JSON.parse(parameters['Random SE'] || '{}', paramReviver);
    const param_texts = Object.assign(
        JSON.parse(parameters['KeyHelp'] || '{}', paramReviver),
        JSON.parse(parameters['Command'] || '{}', paramReviver),
        JSON.parse(parameters['Message'] || '{}', paramReviver),
        { Kinds: Object.assign(
            {},
            ...JSON.parse(parameters['Kinds'] || '[]', paramReviver).map(
                kind => ({ [kind.Type]: kind.Text })
            )
        ) },
        JSON.parse(parameters['Parts'] || '{}', paramReviver),
        JSON.parse(parameters['Colors'] || '{}', paramReviver)
    );

    const DATABASE = CharGenerator.DATABASE;
    DATABASE.partsColorNumbers = {
        Face: [1], FrontHair: [3], RearHair: [3, 4], Beard: [3], Ears: [1], Eyes: [2], Eyebrows: [3], Nose: [1], Mouth: [1], FacialMark: [5], BeastEars: [6], Tail: [23], Wing: [24], Clothing: [7, 8, 9, 10], Cloak: [11, 12], AccA: [13, 14, 15], AccB: [16, 17, 18, 19], Glasses: [20, 21, 22]
    };

    // JsExtensions alternative
    const MathExt = (() => {
        // Number.prototype.clamp と違い、下限優先
        const clamp = (x, min, max) => Math.max(Math.min(x, max), min);
        const mod = (x, n) => ((x % n) + n) % n;
        const randomInt = (x) => Math.floor(x * Math.random());
        return { clamp, mod, randomInt };
    })();
    
    /**
     * 配列の一致判定。
     * 
     * @param {array} ary1 - 配列1。
     * @param {array} ary2 - 配列2。
     * @returns {boolean}
     */
    function array_equals (ary1, ary2) {
        return JSON.stringify(ary1) === JSON.stringify(ary2);
    }
    
    //-------------------------------------------------------------------------
    // PluginManager
    
    PluginManager.registerCommand(basePluginName, 'Op1:callCharMake', args => {
        if (!$gameParty.inBattle()) {
            const actorId = PluginManager.mppValue(args.actorId);
            const actor = $gameActors.actor(actorId);
            const random = args.random === 'true';
            if (actor && actor.geneKind()) {
                $gameParty.setMenuActor(actor);
                SceneManager.push(Scene_CharacterEdit);
                Scene_CharacterEdit.startRandom = random;
            }
        }
    });

    PluginManager.registerCommand(basePluginName, 'Op1:changePartsRandom', args => {
        if (!$gameParty.inBattle()) {
            const actorId = PluginManager.mppValue(args.actorId);
            const actor = $gameActors.actor(actorId);
            CharGenerator.changePartsRandom(actor);
        }
    });

    //-------------------------------------------------------------------------
    // ImageManager

    ImageManager.loadGeneratorVariation = function(kind, filename) {
        const folder = `generator/Variation/${kind}/`;
        return this.loadBitmap(folder, filename, 0);
    };

    ImageManager.existGeneImage = function(type, kind, partsName, partsId) {
        let child = $dataCharGene;
        for (const category of [type, kind, partsName]) {
            child = child[category];
            if (!child) return false;
        }
        return child.includes(partsId);
    };
    
    //-------------------------------------------------------------------------
    // CharGenerator

    CharGenerator.changePartsRandom = function(actor) {
        if (actor && actor.geneKind() in $dataCharGene.icon) {
            const icon = $dataCharGene.icon[actor.geneKind()];
            for (const partsName of DATABASE.icon) {
                const list = icon[partsName];
                if (param_RandomParts[partsName] && list && list.length > 0) {
                    const realList = this.realList(partsName, list);
                    const partsId = realList[MathExt.randomInt(realList.length)];
                    actor.setGeneParts(partsName, partsId);
                }
            }
            for (let i = 1; i <= 24; i++) {
                if (param_RandomColors[`Color${i}`]) {
                    const gradients = CharGenerator.getGradients(i);
                    const ci = MathExt.randomInt(Math.floor(gradients.height / 4));
                    actor.setGeneColor(i, ci);
                }
            }
            actor.refreshImageName();
        }
    };

    CharGenerator.realList = function(partsName, list) {
        const realList = [...list];
        if (!DATABASE.forceParts.has(partsName)) {
            realList.push(0);
        }
        for (const partsWeight of param_PartsWeights) {
            if (partsWeight['Parts Name'] === partsName) {
                const partsId = partsWeight['Id'];
                const index = realList.indexOf(partsId);
                if (index >= 0) {
                    realList.splice(index, 1);
                    for (let i = 0; i < partsWeight['Weight']; i++) {
                        realList.push(partsId);
                    }
                }
            }
        }
        return realList;
    };

    //-------------------------------------------------------------------------
    // Game_Actor

    Game_Actor.prototype.geneKind = function() {
        return this._geneKind;
    };

    Game_Actor.prototype.geneParts = function() {
        return this._geneParts;
    };

    Game_Actor.prototype.geneColors = function() {
        return this._geneColors;
    };

    Game_Actor.prototype.classGenePartsId = function(i) {
        const traits = [this.currentClass()];
        return this.traitsMetaPartsId(i, traits, this._geneKind);
    };
    
    Game_Actor.prototype.isClassGeneColorFixed = function(cn) {
        const traits = [this.currentClass()];
        return !!this.traitsMetaColors(cn, traits, this._geneKind);
    };
    
    Game_Actor.prototype.setGeneParts = function(partsName, n, needsRefreah = false) {
        const index = DATABASE.icon.indexOf(partsName);
        if (index >= 0 && this._geneParts[index] !== n) {
            this._geneParts[index] = n;
            if (needsRefreah) this.refreshImageName();
        }
    };

    Game_Actor.prototype.setGeneColor = function(number, index, needsRefreah = false) {
        if (number > 0 && number <= 24) {
            this._geneColors[number * 4 - 4] = index;
            if (needsRefreah) this.refreshImageName();
        }
    };

    Game_Actor.prototype.setGeneColorCustom = function(number, r, g, b) {
        if (number > 0) {
            this._geneColors.splice(number * 4 - 3, 3, r, g, b);
            this.refreshImageName();
        }
    };

    Game_Actor.prototype.setGeneParams = function(geneParts, geneColors) {
        this._geneParts = geneParts;
        this._geneColors = geneColors;
        this.refreshImageName();
    };

    //-------------------------------------------------------------------
    // Window_CharEdit_Kinds

    class Window_CharEdit_Kinds extends Window_HorzCommand {
        constructor(rect) {
            super(rect);
            this.active = false;
            this.cursorActive = true;
            this.setBackgroundType(2);
        }

        windowWidth() {
            return this.maxCols() * 160 + $gameSystem.windowPadding() * 2;
        }
    
        setActor(actor) {
            if (this._actor !== actor) {
                this._actor = actor;
                this.refresh();
            }
        }
    
        maxCols() {
            return CharGenerator.DATABASE.kinds.length;
        }

        isOpenAndActive() {
            return this.visible && this.cursorActive;
        }

        refresh() {
            super.refresh();
            if (this._actor) {
                this.selectSymbol(this._actor.geneKind());
            }
        }

        makeCommandList() {
            for (const kind of CharGenerator.DATABASE.kinds) {
                this.addCommand(param_texts.Kinds[kind] || '', kind);
            }
        }

        needsSelection() {
            return param_ChangeKind && this.maxItems() >= 2;
        }

        processCursorMove() {
            if (this.isOpenAndActive() && this.isCursorMovable()) {
                const lastIndex = this.index();
                if (Input.isRepeated('pagedown')) {
                    this.cursorRight(Input.isTriggered('pagedown'));
                }
                if (Input.isRepeated('pageup')) {
                    this.cursorLeft(Input.isTriggered('pageup'));
                }
                if (this.index() !== lastIndex) {
                    SoundManager.playCursor();
                    this.callHandler('pageChange');
                }
            }
        }
    
        processHandling() {}
    
        processWheel() {}
    
        isScrollEnabled() {
            return false;
        }
    
        isHoverEnabled() {
            return false;
        }
    
        onTouchSelect(trigger) {
            if (this.isOpenAndActive()) {
                const lastIndex = this.index();
                super.onTouchSelect(trigger);
                if (this.index() !== lastIndex) {
                    this.callHandler('pageChange');
                }
            }
        }
    
        playOkSound() {}
    
    }

    //-------------------------------------------------------------------
    // Window_CharEdit_Category

    class Window_CharEdit_Category extends Window_Command {
        windowWidth() {
            return 200;
        }
    
        setActor(actor) {
            if (this._actor !== actor) {
                this._actor = actor;
                this.refresh();
            }
        }
    
        numVisibleRows() {
            const maxHeight = Graphics.boxHeight - 64 - this.padding * 2;
            return Math.floor(maxHeight / this.itemHeight());
        }
    
        update() {
            super.update();
            this.updateVariationWindow();
        }
    
        isHoverEnabled() {
            return false;
        }

        cursorPageup() {}

        cursorPagedown() {}

        updateVariationWindow() {
            if (this._variationWindow) {
                this._variationWindow.setCategory(this.currentSymbol());
            }
        }
    
        refresh() {
            super.refresh();
            this.select(MathExt.clamp(this.index(), 0, this.maxItems() - 1));
        }

        makeCommandList() {
            if (this._actor) {
                const icon = $dataCharGene.icon[this._actor.geneKind()];
                if (icon) {
                    for (const partsName of param_PartsList) {
                        if (partsName in icon && icon[partsName].length > 0) {
                            this.addCommand(param_texts[partsName], partsName);
                        }
                    }
                }
            }
        }
    
        setVariationWindow(variationWindow) {
            this._variationWindow = variationWindow;
            this.updateVariationWindow();
        }
    
    }

    //-------------------------------------------------------------------------
    // Window_CharEdit_Variation

    class Window_CharEdit_Variation extends Window_StatusBase {
        constructor(rect) {
            super(rect);
            this._actor = null;
            this._partsName = 'none';
            this._data = [];
        }

        windowWidth() {
            const padding = $gameSystem.windowPadding();
            return this.itemWidth() * this.maxCols() + padding * 2;
        }
    
        setActor(actor) {
            this._actor = actor;
        }
    
        setCategory(category) {
            if (this._partsName !== category) {
                this._partsName = category;
                this.refresh();
                this.selectParts();
            }
        }
    
        itemPadding() {
            return 4;
        }
        
        lineHeight() {
            return 64;
        }
    
        maxCols() {
            return 4;
        }
    
        itemWidth() {
            return 80;
        }
    
        maxItems() {
            return this._data ? this._data.length : 1;
        }
    
        item() {
            const index = this.index();
            return this._data && index >= 0 ? this._data[index] : 0;
        }
    
        makeItemList() {
            const kind = this._actor.geneKind();
            const parts = kind ? $dataCharGene.icon[kind] : null;
            const n = DATABASE.icon.indexOf(this._partsName);
            const fixedPartsId = this._actor.classGenePartsId(n);
            const list = [];
            if (parts && this._partsName in parts) {
                list.push(...parts[this._partsName]);
            }
            if (!DATABASE.forceParts.has(this._partsName)) {
                list.unshift(0);
            }
            this._data = list.includes(fixedPartsId) ? [fixedPartsId] : list;
        }
    
        selectParts() {
            const n = DATABASE.icon.indexOf(this._partsName);
            const partsId = this._actor.geneParts()[n];
            const index = this._data.indexOf(partsId);
            this.scrollTo(0, 0);
            this.forceSelect(index >= 0 ? index : 0);
        }
    
        update() {
            const lastIndex = this.index();
            super.update();
            if (this.isOpenAndActive() && lastIndex !== this.index()) {
                this.setActorParts();
            }
            this.updateColorWindow();
        }
    
        isHoverEnabled() {
            return false;
        }

        cursorPageup() {}

        cursorPagedown() {}

        setActorParts() {
            this._actor.setGeneParts(this._partsName, this.item(), true);
        }
    
        drawItem(index) {
            const partsId = this._data[index];
            if (partsId > 0) {
                const rect = this.itemLineRect(index);
                this.placePartsIcon(partsId, rect.x, rect.y);
            }
        }
    
        processCancel() {
            if (this.isCancelTriggered()) {
                super.processCancel();
            } else {
                SoundManager.playCancel();
                this.updateInputData();
                this.deactivate();
                this.callHandler('touchCancel');
            }
        }
    
        setColorWindow(colorWindow) {
            this._colorWindow = colorWindow;
            this.updateColorWindow();
        }
    
        updateColorWindow() {
            if (this._colorWindow) {
                this._colorWindow.setItem(this._partsName, this.item());
            }
        }
    
        refresh() {
            this.makeItemList();
            super.refresh();
        }
    
        placePartsIcon(partsId, x, y) {
            const key = `icon${x}-${y}`;
            const sprite = this.createInnerSprite(key, Sprite);
            const bitmap = this.variationBitmap(partsId);
            if (sprite.bitmap !== bitmap) {
                sprite.texture.frame = new Rectangle();
                sprite.bitmap = bitmap;
            }
            sprite.move(x, y);
            sprite.show();
        }
        
        variationBitmap(partsId) {
            const kind = this._actor.geneKind();
            const name = `icon_${this._partsName}_p${partsId.padZero(2)}`;
            return ImageManager.loadGeneratorVariation(kind, name);
        }
    
    }

    //-------------------------------------------------------------------------
    // Window_CharEdit_ColorBase

    class Window_CharEdit_ColorBase extends Window_Command {
        constructor(rect) {
            super(rect);
            this._actor = null;
            this.deactivate();
        }

        setActor(actor) {
            this._actor = actor;
        }
    
        drawColor(colorData, cn, x, y) {
            const context = this.contents.context;
            context.save();
            context.fillStyle = 'rgba(0, 0, 0, 0.5)';
            context.fillRect(x, y + 3, 30, 30);
            context.fillStyle = 'white';
            context.fillRect(x + 1, y + 4, 28, 28);
            const ci = colorData[0];
            if (ci < 0) {
                const grad = context.createLinearGradient(x + 2, 0, x + 26, 0);
                grad.addColorStop(0, '#fff');
                grad.addColorStop(0.5, `rgb(${colorData.slice(1)})`);
                grad.addColorStop(1, '#000');
                context.fillStyle = grad;
                context.fillRect(x + 2, y + 5, 26, 26);
            } else if (ci > 0 || this.isValidColor(cn)) {
                const image = CharGenerator.getGradients(cn).image;
                context.drawImage(image, 0, ci * 4, 256, 4, x + 2, y + 5, 26, 26);
            } else {
                context.beginPath();
                context.moveTo(x + 2, y + 31);
                context.lineTo(x + 28, y + 5);
                context.lineCap = 'round';
                context.lineWidth = 2.5;
                context.strokeStyle = 'red';
                context.stroke();
            }
            context.restore();
            this.contents.baseTexture.update();
        }
    
        isValidColor(number) {
            return Object.values(DATABASE.gradients).flat().includes(number);
        }
    
    }

    //-------------------------------------------------------------------------
    // Window_CharEdit_ColorSlot

    class Window_CharEdit_ColorSlot extends Window_CharEdit_ColorBase {
        constructor(rect) {
            super(rect);
            this._partsName = 'none';
            this._partsId = 0;
            this._colorData = null;
            this._colorNumbers = null;
        }

        // currentBottomY() {
        //     return this.y + this.padding - this._scrollY + 
        //         (this.row() + 1) * this.itemHeight();
        // }
    
        setItem(partsName, partsId) {
            if (this._partsName !== partsName || this._partsId !== partsId) {
                this._partsName = partsName;
                this._partsId = partsId;
                this.loadColorData();
                this.clearCommandList();
                this.makeItemList();
                this.checkColorData();
                this.refresh();
                this.forceSelect(0);
            }
        }
    
        loadColorData() {
            const partsId = this._partsId;
            if (partsId > 0) {
                const kind = this._actor.geneKind();
                const partsName = this._partsName;
                this._colorData = [];
                this._colorNumbers = [];
                if (partsName === 'Eyes') {
                    this._colorNumbers.push(2);
                }
                for (const after of ['', '1', '2']) {
                    const name = partsName + after;
                    if (ImageManager.existGeneImage('TV', kind, name, partsId)) {
                        const filename = `TV_${name}_p${partsId.padZero(2)}`;
                        this._colorData.push(
                            CharGenerator.getColor('TV', kind, filename)
                        );
                    }
                    const key = `${kind},${name},${partsId}`;
                    if (key in $dataCharGene.FaceOrder) {
                        for (const filename of $dataCharGene.FaceOrder[key]) {
                            const match = /_m(\d\d\d)/.exec(filename);
                            if (match) this._colorNumbers.push(+match[1]);
                        }
                    }
                }
            }
        }
        
        update() {
            super.update();
            this.checkColorData();
        }
        
        isHoverEnabled() {
            return false;
        }

        cursorPageup() {}

        cursorPagedown() {}

        checkColorData() {
            if (this._colorData && this._colorData.every(color => color.isReady())) {
                const colors = this.usedColorSet();
                for (const command of this._list) {
                    const cn = command.ext;
                    command.enabled = (
                        colors.has(cn) && !this._actor.isClassGeneColorFixed(cn)
                    );
                }
                this.refresh();
                this._colorData = null;
            }
        }
        
        usedColorSet() {
            return new Set(
                this._colorData
                    .map(color => color.colorData().filter((_, i) => i % 2 === 1))
                    .flat()
                    .concat(this._colorNumbers)
            );
        }
        
        processCancel() {
            if (this.isCancelTriggered()) {
                super.processCancel();
            } else {
                SoundManager.playCancel();
                this.updateInputData();
                this.deactivate();
                this.callHandler('touchCancel');
            }
        }

        makeItemList() {
            if (this._partsName in DATABASE.partsColorNumbers) {
                for (const cn of DATABASE.partsColorNumbers[this._partsName]) {
                    const text = param_texts['Color' + cn];
                    this.addCommand(text, 'color', false, cn);
                }
            }
        }
    
        refresh() {
            if (this._list) {
                Window_Selectable.prototype.refresh.call(this);
            }
        }
        
        drawItem(index) {
            const rect = this.itemLineRect(index);
            const name = this.commandName(index);
            const cn = this._list[index].ext;
            const colorData = this._actor.geneColors().slice(cn * 4 - 4, cn * 4);
            this.resetTextColor();
            this.changePaintOpacity(this.isCommandEnabled(index));
            this.drawColor(colorData, cn, rect.x, rect.y);
            this.drawText(name, rect.x + 38, rect.y, rect.width - 38);
        }
    
    }

    //-------------------------------------------------------------------------
    // Window_CharEdit_ColorList

    class Window_CharEdit_ColorList extends Window_CharEdit_ColorBase {
        constructor(rect) {
            super(rect);
            this.openness = 0;
        }

        windowWidth() {
            const itemWidth = this.itemWidth();
            const padding = $gameSystem.windowPadding();
            return itemWidth * this.maxCols() + padding * 2;
        }
    
        numVisibleRows() {
            return 5;
        }
    
        itemPadding() {
            return 4;
        }
        
        maxCols() {
            return 6;
        }
    
        itemWidth() {
            return 46;
        }
    
        cursorDown(wrap) {
            if (this.index() >= this.maxItems() - this.maxCols()) {
                this.select(this.maxItems() - 1);
            } else {
                super.cursorDown(wrap);
            }
        }
    
        makeCommandList() {
            if (typeof this._number !== 'number') return;
            const gradients = CharGenerator.getGradients(this._number);
            const max = Math.floor(gradients.height / 4);
            for (let i = 0; i < max; i++) {
                this.addCommand(i, 'color');
            }
            if (param_ColorCustom) {
                this.addCommand(-1, 'custom');
            }
        }
    
        setup(number) {
            this._number = number;
            this.refresh();
            this.selectColor();
            this.activate();
            this.open();
        }
    
        selectColor() {
            const n = this._number;
            const ci = n > 0 ? this._actor.geneColors()[n * 4 - 4] : 0;
            const index = this._list.findIndex(command => command.name === ci);
            this.forceSelect(index >= 0 ? index : 0);
        }
    
        itemRect(index) {
            if (index > 0 && this.commandSymbol(index) === 'custom') {
                const i = index - 1;
                const itemHeight = this.itemHeight();
                const colSpacing = this.colSpacing();
                const rowSpacing = this.rowSpacing();
                const row = Math.floor(i / this.maxCols() + 1)
                const width = this.innerWidth - colSpacing;
                const height = itemHeight - rowSpacing;
                const x = colSpacing / 2 - this.scrollBaseX();
                const y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY();
                return new Rectangle(x, y, width, height);
            }
            return super.itemRect(index);
        }
    
        update() {
            const lastIndex = this._index;
            super.update();
            if (this.isOpenAndActive() && lastIndex !== this._index) {
                this.setActorColor();
            }
        }
    
        setActorColor() {
            const ci = this.commandName(this.index());
            this._actor.setGeneColor(this._number, ci, true);
        }

        drawItem(index) {
            const rect = this.itemLineRect(index);
            const ci = this.commandName(index);
            if (ci < 0) {
                this.drawText(param_texts.Custom, rect.x, rect.y, rect.width, 'center');
            } else {
                this.drawColor([ci], this._number, rect.x, rect.y);
            }
        }
    
    }

    //-------------------------------------------------------------------------
    // Window_CharEdit_ColorRgb

    class Window_CharEdit_ColorRgb extends Window_Selectable {
        constructor(rect) {
            super(rect);
            this.openness = 0;
            this._actor = null;
            this._color = [0, 0, 0];
            this._lastColor = [0, 0, 0, 0];
            this._sliderIndex = -1;
        }

        maxItems() {
            return 4;
        }
    
        itemWidth() {
            return 304;
        }
    
        sliderX() {
            return this.itemPadding() + 88;
        }
    
        setActor(actor) {
            this._actor = actor;
        }
    
        isOpenAndActive() {
            return super.isOpenAndActive() && this._sliderIndex < 0;
        }
    
        cursorRight() {
            const index = this.index();
            if (index < 3 && this._color[index] < 255) {
                this._color[index] = Math.min(this._color[index] + 17, 255);
                this.playCursorSound();
                this.redrawCurrentItem();
                this.setActorColor();
            }
        }
    
        cursorLeft() {
            const index = this.index();
            if (index < 3 && this._color[index] > 0) {
                this._color[index] = Math.max(this._color[index] - 17, 0);
                this.playCursorSound();
                this.redrawCurrentItem();
                this.setActorColor();
            }
        }
    
        setup(number) {
            this._number = number;
            this._lastColor = this._actor.geneColors().slice(number * 4 - 3, number * 4);
            this._color = [...this._lastColor];
            this.refresh();
            this.forceSelect(0);
            this.activate();
            this.open();
        }
    
        setActorColor() {
            this._actor.setGeneColorCustom(this._number, ...this._color);
        }
    
        restoreActorColor() {
            this._actor.setGeneColorCustom(this._number, ...this._lastColor);
        }
    
        update() {
            super.update();
            this.updateSlider();
        }
    
        updateSlider() {
            if (this.isOpenAndActive() && this.isTouchedInsideFrame()) {
                const index = this.index();
                if (index < 3 && TouchInput.isTriggered()) {
                    this.playCursorSound();
                    this._sliderIndex = index;
                }
            }
            if (this._sliderIndex >= 0) {
                if (TouchInput.isPressed()) {
                    const index = this.index();
                    const lc = this._color[index];
                    const touchPos = new Point(TouchInput.x, TouchInput.y);
                    const localPos = this.worldTransform.applyInverse(touchPos);
                    const tx = localPos.x - this.padding - this.sliderX();
                    const c = Math.round(255 * tx / 192 / 17) * 17;
                    this._color[index] = MathExt.clamp(c, 0, 255);
                    if (lc !== this._color[index]) {
                        this.redrawCurrentItem();
                    }
                } else {
                    this.setActorColor();
                    this._sliderIndex = -1;
                }
            }
        }
    
        processOk() {
            if (this.index() === 3) {
                super.processOk();
            }
        }
    
        drawItem(index) {
            const rect = this.itemLineRect(index);
            if (index < 3) {
                const text = this.itemText(index);
                const color = this.itemColor(index);
                const c = this._color[index];
                this.drawText(text + c, rect.x + 6, rect.y, rect.width);
                const dx = this.sliderX();
                const dy = rect.y + Math.floor(rect.height / 2);
                this.drawSlider(dx, dy, 192, 8, c / 255, color);
            } else {
                this.drawText(param_texts.Ok, rect.x + 6, rect.y, rect.width, 'center');
            }
        }
    
        itemText(index) {
            if (index === 0) return 'R:';
            if (index === 1) return 'G:';
            return 'B:';
        }
    
        itemColor(index) {
            if (index === 0) return 'red';
            if (index === 1) return 'lime';
            return 'blue';
        }
    
        drawSlider(x, y, width, height, value, color) {
            const context = this.contents.context;
            const dx = x + height / 2;
            const dw = width - height;
            context.save();
            
            context.strokeStyle = 'gray';
            context.lineWidth = height;
            context.lineCap = 'round';
            context.beginPath();
            context.moveTo(dx, y);
            context.lineTo(dx + dw, y);
            context.stroke();
            const gradient = context.createLinearGradient(x, y, x + width, y);
            gradient.addColorStop(0, 'white');
            gradient.addColorStop(1, color);
            context.strokeStyle = gradient;
            context.lineWidth = height - 2;
            context.stroke();
            
            context.restore();
            
            const vx = dx + dw * value;
            context.fillStyle = 'gainsboro';
            context.shadowColor = 'black';
            context.shadowOffsetX = 1;
            context.shadowOffsetY = 1;
            context.shadowBlur = 6;
            context.beginPath();
            context.arc(vx, y, 9, 0, Math.PI * 2);
            context.fill();
            context.strokeStyle = 'gray';
            context.shadowColor = 'transparent';
            context.stroke();
            
            context.restore();
            this.contents.baseTexture.update();
        }
    
        redrawItem(index) {
            super.redrawItem(index);
            this.refreshColor();
        }
    
        refresh() {
            super.refresh();
            this.refreshColor();
        }
    
        refreshColor() {
            const x = this.itemWidth() + 2;
            const y = 2;
            const width = this.innerWidth - x - 2;
            const height = this.lineHeight() * 3 - 4;
            const color = `rgb(${this._color})`;
            this.contents.clearRect(x, y, width, height);
            this.contents.fillRect(x, y, width, height, 'black');
            this.contents.fillRect(x+1, y+1, width-2, height-2, 'white');
            this.contents.fillRect(x+2, y+2, width-4, height-4, color);
        }
    
    }

    //-------------------------------------------------------------------------
    // Window_CharEdit_Preview

    class Window_CharEdit_Preview extends Window_StatusBase {
        constructor(rect) {
            super(rect);
            this._actor = null;
            this._animeCount = 0;
            this._animeIndex = 0;
        }

        static characterDirection = [2, 4, 8, 6];
        static battlerMotion = ['walk', 'swing', 'chant', 'spell'];
    
        windowWidth() {
            const padding = $gameSystem.windowPadding();
            return this.itemX(param_PreviewList.length) + padding * 2;
        }
    
        windowHeight() {
            return 144 + $gameSystem.windowPadding() * 2;
        }
    
        contentsHeight() {
            return this.innerHeight;
        }
        
        maxCols() {
            return param_PreviewList.length;
        }
    
        maxItems() {
            return this.maxCols();
        }
    
        setActor(actor) {
            this._actor = actor;
        }
    
        itemX(index) {
            return [...Array(index).keys()]
                .reduce((r, i) => r + this.itemWidth(i), 0);
        }
    
        itemWidth(index) {
            return param_PreviewList[index] === 'Walk 4dir wide' ? 216 : 144;
        }
    
        update() {
            super.update();
            if (this._characterName !== this._actor.characterName()) {
                this._characterName = this._actor.characterName();
                this.refresh();
            }
            this.updateAnimation();
        }
    
        updateAnimation() {
            this._animeCount++;
            if (this._animeCount % (24 * 4) === 0) {
                if (this._animeCount === 24 * 8) {
                    this._animeIndex = (this._animeIndex + 1) % 4;
                    this._animeCount = 0;
                }
                this.refresh();
            }
        }
    
        drawItem(index) {
            const actor = this._actor;
            const x = this.itemX(index);
            switch (param_PreviewList[index]) {
                case 'Walk turn': {
                    const d = this.animeDirection();
                    this.placeActorCharacter(actor, x + 72, 128, d, 2);
                    break;
                }
                case 'Walk front':
                    this.placeActorCharacter(actor, x + 72, 128, 2, 2);
                    break;
                case 'Walk 4dir':
                    this.placeActorCharacter(actor, x + 36, 68, 2, 4/3);
                    this.placeActorCharacter(actor, x + 108, 68, 8, 4/3);
                    this.placeActorCharacter(actor, x + 36, 140, 4, 4/3);
                    this.placeActorCharacter(actor, x + 108, 140, 6, 4/3);
                    break;
                case 'Walk 4dir wide':
                    this.placeActorCharacter(actor, x + 36, 104+4, 4, 1.5);
                    this.placeActorCharacter(actor, x + 108, 68+4, 8, 1.5);
                    this.placeActorCharacter(actor, x + 108, 140+4, 2, 1.5);
                    this.placeActorCharacter(actor, x + 180, 104+4, 6, 1.5);
                    break;
                case 'Battler': {
                    const type = this.animeMotionType();
                    this.placeActorBattler(actor, x + 72, 136, type, 2);
                    break;
                }
                case 'Face':
                    this.prepareDrawActorFace(actor, x, 0);
                    break;
            }
        }
    
        drawItemBackground() {}

        animeDirection() {
            return Window_CharEdit_Preview.characterDirection[this._animeIndex];
        }
    
        animeMotionType() {
            return Window_CharEdit_Preview.battlerMotion[this._animeIndex];
        }
    
        placeActorCharacter(actor, x, y, direction, scale) {
            const key = `character${x}-${y}`;
            const sprite = this.createInnerSprite(key, Sprite_MenuCharacter);
            sprite.setup(actor, direction, scale);
            sprite.move(x, y);
            sprite.show();
        }
        
        placeActorBattler(actor, x, y, motionType, scale) {
            const key = `battler${x}-${y}`;
            const sprite = this.createInnerSprite(key, Sprite_MenuActor);
            sprite.setup(actor, motionType, scale);
            sprite.move(x, y);
            sprite.show();
        }
        
        prepareDrawActorFace(actor, x, y) {
            const bitmap = ImageManager.loadFace(actor.faceName());
            const listner = this.performDrawActorFace.bind(this, actor, x, y);
            bitmap.addLoadListener(listner);
        }
        
        performDrawActorFace(actor, x, y) {
            const width = ImageManager.faceWidth;
            const height = ImageManager.faceHeight;
            this.drawActorFace(actor, x, y, width, height);
        }
        
    }

    //-------------------------------------------------------------------------
    // Window_CharEdit_KeyHelp

    class Window_CharEdit_KeyHelp extends Window_Base {
        constructor(rect) {
            super(rect);
            this.updatePlacement(rect);
            this.createContents();
            this.setBackgroundType(param_KeyHelpWindowBackgroundType);
            this.refresh();
        }

        windowWidth() {
            const padding = this.itemPadding() + this.standardPadding();
            return this.textSizeEx(this.text()).width + padding * 2;
        }
    
        windowHeight() {
            return this.itemHeight() + this.standardPadding() * 2;
        }
    
        standardPadding() {
            return 8;
        }
    
        itemPadding() {
            return 14;
        }
    
        updatePadding() {
            this.padding = this.standardPadding();
        }
    
        updatePlacement(rect) {
            const ww = this.windowWidth();
            const wh = rect.height;
            const wx = rect.x - ww;
            const wy = rect.y;
            this.move(wx, wy, ww, wh);
        }
    
        setRandomHandler(handler) {
            this._randomHandler = handler;
        }
    
        text() {
            return param_texts.PageChange;
        }
    
        refresh() {
            this.contents.clear();
            this.drawTextEx(this.text(), this.itemPadding(), 0);
        }
    
        refreshDimmerBitmap() {
            if (this._dimmerSprite) {
                const bitmap = this._dimmerSprite.bitmap;
                const w = this.width > 0 ? this.width + 4 : 0;
                const h = this.height;
                const m = this.padding;
                const c1 = ColorManager.dimColor1();
                const c2 = ColorManager.dimColor2();
                bitmap.resize(w, h);
                bitmap.gradientFillRect(0, 0, w, m, c2, c1, true);
                bitmap.fillRect(0, m, w, h - m * 2, c1);
                bitmap.gradientFillRect(0, h - m, w, m, c1, c2, true);
                this._dimmerSprite.setFrame(0, 0, w, h);
            }
        }

    }

    //-------------------------------------------------------------------------
    // Window_CharEdit_Random

    class Window_CharEdit_Random extends Window_CharEdit_KeyHelp {
        text() {
            return param_texts.Random;
        }
    
        setRandomHandler(handler) {
            this._randomHandler = handler;
        }
    
        update() {
            super.update();
            this.processHandling();
        }
    
        processHandling() {
            if (this.isOpen() && this.visible && this.active) {
                if (
                    Input.isTriggered('shift') ||
                    (TouchInput.isTriggered() && this.isTouchedInsideFrame())
                ) {
                    this.processOk();
                }
            }
        }
    
        isTouchedInsideFrame() {
            return Window_Selectable.prototype.isTouchedInsideFrame.call(this);
        }
    
        processOk() {
            if (this._randomHandler) {
                AudioManager.playStaticSe(param_RandomSE);
                Input.update();
                TouchInput.update();
                this._randomHandler();
            }
        }
    
    }

    //-----------------------------------------------------------------------------
    // Sprite_MenuCharacter

    class Sprite_MenuCharacter extends Sprite_Character {
        constructor() {
            super(null);
            this._actor = null;
            this._animationCount = 0;
            this._pattern = 0;
            this._direction = 0;
        }

        setup(actor, direction, scale = 1) {
            this._actor = actor;
            this._direction = direction;
            this.scale.set(scale);
        }

        updateVisibility() {
            Sprite.prototype.updateVisibility.call(this);
            this.visible = this.visible && this.bitmap && this.bitmap.isReady();
        }
        
        updateBitmap() {
            if (this.isImageChanged()) {
                this._tileId = 0;
                this._characterName = this._actor.characterName();
                this._characterIndex = this._actor.characterIndex();
                this.setCharacterBitmap();
            }
        }
        
        isImageChanged() {
            return (
                this._characterName !== this._actor.characterName() ||
                this._characterIndex !== this._actor.characterIndex()
            );
        }
        
        updateFrame() {
            this.updateAnimation();
            super.updateFrame();
        }
        
        updateAnimation() {
            if (++this._animationCount >= this.animationWait()) {
                this._pattern = (this._pattern + 1) % 4;
                this._animationCount = 0;
            }
        }

        animationWait() {
            return 24;
        }
        
        characterBlockX() {
            const index = this._characterIndex;
            return (index % 4) * 3;
        }
        
        characterBlockY() {
            const index = this._characterIndex;
            return Math.floor(index / 4) * 4;
        }
        
        characterPatternX() {
            return this._pattern < 3 ? this._pattern : 1;
        }
        
        characterPatternY() {
            return (this._direction - 2) / 2;
        }
        
        updatePosition() {}

        updateOther() {}

    }

    //-----------------------------------------------------------------------------
    // Sprite_MenuActor

    class Sprite_MenuActor extends Sprite_Actor {
        createShadowSprite() {}

        createWeaponSprite() {}

        createStateSprite() {}

        setup(actor, motionType, scale = 1) {
            this.setBattler(actor);
            this.startMotion(motionType);
            this.scale.set(scale);
        }
    
        setBattler(battler) {
            Sprite_Battler.prototype.setBattler.call(this, battler);
            if (battler !== this._actor) {
                this._actor = battler;
                if (!battler) {
                    this._mainSprite.bitmap = null;
                    this._battlerName = '';
                }
            }
        }
        
        updateVisibility() {
            super.updateVisibility();
            const bitmap = this._mainSprite.bitmap;
            this.visible = this.visible && bitmap && bitmap.isReady();
        }
        
        updateMove() {}

        updatePosition() {}

        updateDamagePopup() {}

        updateSelectionEffect() {}

        updateShadow() {}

        setupMotion() {}

        setupWeaponAnimation() {}

        startMotion(motionType) {
            const motion = Sprite_Actor.MOTIONS[motionType];
            if (this._motion !== motion || !this._motion.loop) {
                this._motion = motion;
                this._motionCount = 0;
                this._pattern = 0;
            }
        }
        
        updateTargetPosition() {}

        motionSpeed() {
            return 18;
        }
    
        refreshMotion() {}

        startEntryMotion() {}

    }

    //-------------------------------------------------------------------------
    // Scene_CharacterEditBase

    class Scene_CharacterEditBase extends Scene_MenuBase {
        prepare(tempActor) {
            this._tempActor = tempActor;
        }

        createBackground() {
            const backgroundName = param_Background.Image;
            if (backgroundName) {
                const bitmap = ImageManager.loadPicture(backgroundName);
                this._backTilingSprite = new TilingSprite(bitmap);
                this._backTilingSprite.move(0, 0, Graphics.width, Graphics.height);
                this.addChild(this._backTilingSprite);
            } else {
                super.createBackground();
            }
        }

        update() {
            super.update();
            this.updateBackground();
        }

        updateBackground() {
            if (this._backTilingSprite) {
                const sprite = this._backTilingSprite;
                const bitmap = sprite.bitmap;
                const x = sprite.origin.x + param_Background.ScrollX / 4;
                const y = sprite.origin.y + param_Background.ScrollY / 4;
                sprite.origin.x = x % bitmap.width;
                sprite.origin.y = y % bitmap.height;
            }
        }

        applyGeneParams(actor1, actor2) {
            const kind = actor2.geneKind();
            const geneParts = [ ...actor2.geneParts() ];
            const geneColors = [ ...actor2.geneColors() ];
            actor1.setGeneKind(kind);
            actor1.setGeneParams(geneParts, geneColors);
        }
    
    }
    
    //-------------------------------------------------------------------------
    // Scene_CharacterEdit

    class Scene_CharacterEdit extends Scene_CharacterEditBase {
        static startRandom = false;

        create() {
            super.create();
            this._switchWindows = [];
            this.createRandomWindow();
            this.createPageChangeWindow();
            this.createKindsWindow();
            this.createCategoryWindow();
            this.createVariationWindow();
            this.createPreviewWindow();
            this.createColorSlotWindow();
            this.createColorListWindow();
            this.createColorRgbWindow();
        }
    
        updateActor() {
            super.updateActor();
            if (!this._tempActor) {
                this._tempActor = JsonEx.makeDeepCopy(this._actor);
                this._tempActor.initEquips([]);
                if (Scene_CharacterEdit.startRandom) {
                    CharGenerator.changePartsRandom(this._tempActor);
                }
            }
            this._tempActor.refreshImageName();
        }
    
        helpAreaHeight() {
            return 0;
        }
        
        createRandomWindow() {
            const rect = this.randomWindowRect();
            this._randomWindow = new Window_CharEdit_Random(rect);
            this._randomWindow.setRandomHandler(this.processRandom.bind(this));
            this.addWindow(this._randomWindow);
        }
    
        randomWindowRect() {
            const ww = 0;
            const wh = Window_CharEdit_Random.prototype.windowHeight();
            const wx = Graphics.boxWidth;
            const wy = this.mainAreaBottom() - wh;
            return new Rectangle(wx, wy, ww, wh);
        }
    
        createPageChangeWindow() {
            const rect = this.pageChangeWindowRect();
            this._pageChangeWindow = new Window_CharEdit_KeyHelp(rect);
            this.addWindow(this._pageChangeWindow);
        }
    
        pageChangeWindowRect() {
            const randomWindow = this._randomWindow;
            const ww = 0;
            const wh = randomWindow.height;
            const wx = Graphics.boxWidth - randomWindow.width;
            const wy = randomWindow.y;
            return new Rectangle(wx, wy, ww, wh);
        }
    
        createKindsWindow() {
            const rect = this.kindsWindowRect();
            this._kindsWindow = new Window_CharEdit_Kinds(rect);
            this._kindsWindow.setActor(this._tempActor);
            this._kindsWindow.setHandler('pageChange', this.onKindsChange.bind(this));
            this.addWindow(this._kindsWindow);
            if (!this._kindsWindow.needsSelection()) {
                this._kindsWindow.hide();
                this._kindsWindow.cursorActive = false;
                this._pageChangeWindow.hide();
            }
        }
    
        kindsWindowRect() {
            const wx = 0;
            const wy = -8;
            const ww = Window_CharEdit_Kinds.prototype.windowWidth();
            const wh = this.calcWindowHeight(1, true);
            return new Rectangle(wx, wy, ww, wh);
        }
    
        createCategoryWindow() {
            const rect = this.categoryWindowRect();
            this._categoryWindow = new Window_CharEdit_Category(rect);
            this._categoryWindow.setActor(this._tempActor);
            this._categoryWindow.setHandler('ok',     this.onCategoryOk.bind(this));
            this._categoryWindow.setHandler('cancel', this.onEditCancel.bind(this));
            this.addWindow(this._categoryWindow);
            this._switchWindows.push(this._categoryWindow);
        }
    
        categoryWindowRect() {
            const randomWindowRect = this.randomWindowRect();
            const wx = 0;
            const wy = this.mainAreaTop();
            const ww = this.mainCommandWidth();
            const wh = this.mainAreaBottom() - wy - randomWindowRect.height;
            return new Rectangle(wx, wy, ww, wh);
        }
    
        createVariationWindow() {
            const rect = this.variationWindowRect();
            const window = new Window_CharEdit_Variation(rect);
            window.setActor(this._tempActor);
            window.setHandler('ok',        this.onVariationOk.bind(this));
            window.setHandler('cancel',    this.onVariationCancel.bind(this));
            window.setHandler('touchCancel', this.onEditCancel.bind(this));
            this.addWindow(window);
            this._categoryWindow.setVariationWindow(window);
            this._switchWindows.push(window);
            this._variationWindow = window;
        }
    
        variationWindowRect() {
            const wx = this._categoryWindow.x + this._categoryWindow.width;
            const wy = this._categoryWindow.y;
            const ww = Window_CharEdit_Variation.prototype.windowWidth();
            const wh = this.previewWindowRect().y - wy;
            return new Rectangle(wx, wy, ww, wh);
        }
    
        createPreviewWindow() {
            const rect = this.previewWindowRect();
            this._previewWindow = new Window_CharEdit_Preview(rect);
            this._previewWindow.setActor(this._tempActor);
            this.addWindow(this._previewWindow);
        }
    
        previewWindowRect() {
            const categoryWindow = this._categoryWindow;
            const wh = Window_CharEdit_Preview.prototype.windowHeight();
            const wx = categoryWindow.x + categoryWindow.width;
            const wy = categoryWindow.y + categoryWindow.height - wh;
            const ww = Graphics.boxWidth - wx;
            return new Rectangle(wx, wy, ww, wh);
        }
    
        createColorSlotWindow() {
            const rect = this.colorSlotWindowRect();
            const window = new Window_CharEdit_ColorSlot(rect);
            window.setActor(this._tempActor);
            window.setHandler('ok',        this.onColorSlotOk.bind(this));
            window.setHandler('cancel',    this.onColorSlotCancel.bind(this));
            window.setHandler('touchCancel', this.onEditCancel.bind(this));
            this.addWindow(window);
            this._variationWindow.setColorWindow(window);
            this._switchWindows.push(window);
            this._colorSlotWindow = window;
        }
    
        colorSlotWindowRect() {
            const variationWindow = this._variationWindow;
            const wx = variationWindow.x + variationWindow.width;
            const wy = variationWindow.y;
            const ww = Graphics.boxWidth - wx;
            const wh = variationWindow.height;
            return new Rectangle(wx, wy, ww, wh);
        }
    
        createColorListWindow() {
            const rect = this.colorListWindowRect();
            const window = new Window_CharEdit_ColorList(rect);
            window.setActor(this._tempActor);
            window.setHandler('ok',     this.onColorListOk.bind(this));
            window.setHandler('cancel', this.onColorListCancel.bind(this));
            this.addWindow(window);
            this._colorListWindow = window;
        }
    
        colorListWindowRect() {
            const slotWindow = this._colorSlotWindow;
            const ww = Window_CharEdit_ColorList.prototype.windowWidth();
            const wh = this.calcWindowHeight(param_ColorCustom ? 5 : 4, true);
            const wx = slotWindow.x + slotWindow.width - ww;
            const wy = slotWindow.y + slotWindow.height - wh;
            return new Rectangle(wx, wy, ww, wh);
        }
    
        createColorRgbWindow() {
            const rect = this.colorRgbWindowRect();
            this._colorRgbWindow = new Window_CharEdit_ColorRgb(rect);
            this._colorRgbWindow.setActor(this._tempActor);
            this._colorRgbWindow.setHandler('ok',     this.onColorRgbOk.bind(this));
            this._colorRgbWindow.setHandler('cancel', this.onColorRgbCancel.bind(this));
            this.addWindow(this._colorRgbWindow);
        }
    
        colorRgbWindowRect() {
            const variationWindow = this._variationWindow;
            const ww = 400;
            const wh = this.calcWindowHeight(4, true);
            const wx = variationWindow.x;
            const wy = variationWindow.y + variationWindow.height - wh;
            return new Rectangle(wx, wy, ww, wh);
        }
    
        update() {
            super.update();
            this.updateWindowSwitch();
            this.updateCallDebug();
        }
    
        updateWindowSwitch() {
            const switchWindows = this._switchWindows;
            if (
                TouchInput.isTriggered() &&
                switchWindows.some(window => window.active)
            ) {
                const touchWindow = switchWindows.find(
                    window => !window.active && window.isTouchedInsideFrame()
                );
                if (touchWindow) {
                    for (const window of switchWindows) {
                        if (window === touchWindow) {
                            window.activate();
                            window.update();
                        } else {
                            window.deactivate();
                        }
                    }
                    TouchInput._moved = true;
                    TouchInput.update();
                }
            }
        }
    
        updateCallDebug() {
            if (this.isDebugCalled()) {
                const actorParts = this._tempActor.geneParts();
                const texts = [this.debugHeaderText1()];
                texts.push(`<GeneDefaultParts:${actorParts}>`);
                const geneColors = this._tempActor.geneColors();
                for (let i = 0; i < 24; i++) {
                    const ci = geneColors[i * 4];
                    if (ci < 0) {
                        const params = geneColors.slice(i * 4, i * 4 + 4);
                        texts.push(`<GeneColor ${i + 1}:${params}>`);
                    } else if (ci > 0) {
                        texts.push(`<GeneColor ${i + 1}:${ci}>`);
                    }
                }
                texts.push(this.debugHeaderText2());
                for (const [i, partsName] of DATABASE.icon.entries()) {
                    const partsId = actorParts[i];
                    if (i >= 2 && partsId > 0) {
                        const text = param_texts[partsName];
                        texts.push(`<GeneParts ${partsName}:${partsId}> // ${text}`);
                    }
                }
                console.log(texts.join('\n'));
            }
        }
    
        isDebugCalled() {
            return Input.isTriggered('debug') && $gameTemp.isPlaytest();
        }
    
        debugHeaderText1() {
            if ($gameSystem.isJapanese()) {
                return '▼ デフォルトパーツ / アクターのメモ欄にコピペする';
            } else {
                return "▼ Default parts / Copy and paste to the actor's Note";
            }
        }
    
        debugHeaderText2() {
            if ($gameSystem.isJapanese()) {
                return '▼ パーツ毎のコマンド / 武器・防具・職業のメモ欄にコピペする / 色は上と同じ';
            } else {
                return '▼ Commands for each parts / Copy and paste into the Note of Weapons, Armors, and Classes / The color is the same as above';
            }
        }
    
        onKindsChange() {
            const kind = this._kindsWindow.currentSymbol();
            this._tempActor.setGeneKind(kind);
            if (Scene_CharacterEdit.startRandom) {
                CharGenerator.changePartsRandom(this._tempActor);
            }

            this._categoryWindow.refresh();
            this._variationWindow.refresh();
            this._variationWindow.selectParts();
            this._colorSlotWindow.refresh();
        }
    
        onEditCancel() {
            if (param_ConfirmationScene && this.isChangeParams()) {
                SceneManager.push(Scene_Confirm);
                SceneManager.prepareNextScene(this._tempActor);
            } else {
                this.applyGeneParams(this._actor, this._tempActor);
                this.popScene();
            }
        }
    
        isChangeParams() {
            if (Scene_CharacterEdit.startRandom) {
                return true;
            }
            const geneParts1 = this._actor.geneParts();
            const geneColors1 = this._actor.geneColors();
            const geneParts2 = this._tempActor.geneParts();
            const geneColors2 = this._tempActor.geneColors();
            return (
                !array_equals(geneParts1, geneParts2) ||
                !array_equals(geneColors1, geneColors2)
            );
        }
    
        onCategoryOk() {
            this._variationWindow.activate();
        }
    
        onVariationOk() {
            this._colorSlotWindow.activate();
        }
    
        onVariationCancel() {
            this._categoryWindow.activate();
        }
    
        onColorSlotOk() {
            //this._colorListWindow.y = this._colorSlotWindow.currentBottomY();
            this._colorListWindow.setup(this._colorSlotWindow.currentExt());
            this._randomWindow.hide();
            this._kindsWindow.cursorActive = false;
            this._pageChangeWindow.hide();
        }
    
        onColorSlotCancel() {
            this._variationWindow.activate();
        }
    
        onColorListOk() {
            if (this._colorListWindow.currentSymbol() === 'color') {
                this._colorSlotWindow.activate();
                this._colorSlotWindow.refresh();
                this._colorListWindow.close();
                this._randomWindow.show();
                this._kindsWindow.cursorActive = true;
                if (this._kindsWindow.needsSelection()) {
                    this._pageChangeWindow.show();
                }
            } else {
                this._colorListWindow.close();
                this._colorRgbWindow.setup(this._colorSlotWindow.currentExt());
            }
        }
    
        onColorListCancel() {
            this._colorSlotWindow.activate();
            this._colorSlotWindow.refresh();
            this._colorListWindow.close();
            this._randomWindow.show();
            this._kindsWindow.cursorActive = true;
            if (this._kindsWindow.needsSelection()) {
                this._pageChangeWindow.show();
            }
        }
    
        onColorRgbOk() {
            this._colorSlotWindow.activate();
            this._colorSlotWindow.refresh();
            this._colorRgbWindow.close();
            this._randomWindow.show();
            this._kindsWindow.cursorActive = true;
            if (this._kindsWindow.needsSelection()) {
                this._pageChangeWindow.show();
            }
        }
    
        onColorRgbCancel() {
            this._colorListWindow.activate();
            this._colorListWindow.open();
            this._colorRgbWindow.restoreActorColor();
            this._colorRgbWindow.close();
        }
    
        processRandom() {
            CharGenerator.changePartsRandom(this._tempActor);
            this._variationWindow.selectParts();
            this._colorSlotWindow.refresh();
        }
    
    }

    //=========================================================================
    // Scene_Confirm
    //=========================================================================

    //-----------------------------------------------------------------------------
    // Window_Confirm

    class Window_Confirm extends Window_Base {
        constructor(rect) {
            super(rect);
            this.openness = 0;
            this.refresh();
            this.open();
        }

        refresh() {
            const text = param_texts.Confirmation;
            this.contents.clear();
            this.drawText(text, 0, 0, this.innerWidth, 'center');
        }
    
    }

    //-------------------------------------------------------------------------
    // Window_ConfirmCommand

    class Window_ConfirmCommand extends Window_Command {
        constructor(rect) {
            super(rect);
            this.openness = 0;
            this.open();
        }

        makeCommandList() {
            this.addCommand(param_texts.Yes, 'ok');
            this.addCommand(param_texts.No, 'cancel');
            if (!Scene_CharacterEdit.startRandom) {
                this.addCommand(param_texts.Default, 'default');
            }
        }
    
        itemTextAlign() {
            return 'center';
        }
    
    }

    //-------------------------------------------------------------------------
    // Scene_Confirm

    class Scene_Confirm extends Scene_CharacterEditBase {
        create() {
            super.create();
            this.createConfirmWindow();
            this.createCommandWindow();
            this.createPreviewWindow();
        }
    
        createConfirmWindow() {
            const rect = this.confirmWindowRect();
            this._confirmWindow = new Window_Confirm(rect);
            this.addWindow(this._confirmWindow);
        }
    
        confirmWindowRect() {
            const wx = -$gameSystem.windowPadding();
            const wy = 192;
            const ww = Graphics.boxWidth + $gameSystem.windowPadding() * 2;
            const wh = this.calcWindowHeight(1, false);
            return new Rectangle(wx, wy, ww, wh);
        }
    
        createCommandWindow() {
            const rect = this.commandWindowRect();
            this._commandWindow = new Window_ConfirmCommand(rect);
            this._commandWindow.setHandler('ok', this.onCommandOk.bind(this));
            this._commandWindow.setHandler('cancel', this.onCommandCancel.bind(this));
            this._commandWindow.setHandler('default', this.onCommandDefault.bind(this));
            this.addWindow(this._commandWindow);
        }
    
        commandWindowRect() {
            const confirmWindow = this._confirmWindow;
            const maxItems = Scene_CharacterEdit.startRandom ? 2 : 3;
            const ww = 208;
            const wh = this.calcWindowHeight(maxItems, true);
            const wx = (Graphics.boxWidth - ww) / 2;
            const wy = confirmWindow.y + confirmWindow.height + 16;
            return new Rectangle(wx, wy, ww, wh);
        }
    
        createPreviewWindow() {
            const rect = this.previewWindowRect();
            this._previewWindow = new Window_CharEdit_Preview(rect);
            this._previewWindow.setActor(this._tempActor);
            this.addWindow(this._previewWindow);
        }
    
        previewWindowRect() {
            const commandWindow = this._commandWindow;
            const ww = Window_CharEdit_Preview.prototype.windowWidth();
            const wh = Window_CharEdit_Preview.prototype.windowHeight();
            const wx = (Graphics.boxWidth - ww) / 2;
            const wy = commandWindow.y + commandWindow.height + 16;
            return new Rectangle(wx, wy, ww, wh);
        }
    
        onCommandOk() {
            this.applyGeneParams(this._actor, this._tempActor);
            SceneManager.goto(Scene_Map);
        }
    
        onCommandCancel() {
            this.popScene();
            SceneManager.prepareNextScene(this._tempActor);
        }
    
        onCommandDefault() {
            this.applyGeneParams(this._tempActor, this._actor);
            this.popScene();
            SceneManager.prepareNextScene(this._tempActor);
        }
    
    }

})();
