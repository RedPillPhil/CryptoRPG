//=============================================================================
// MPP_CharacterMake.js
//=============================================================================
// Copyright (c) 2017-2024 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc キャラクター生成用パーツを使ってキャラクターを作ることができるようになります。
 * @author 木星ペンギン
 * @url http://woodpenguin.web.fc2.com/MV_Plugin/CharacterMake.html
 *
 * @help [version 2.2.0]
 * - このプラグインはRPGツクールMZ用です。
 * - キャラクター生成用パーツを使ってキャラクターを作ることができるように
 *   なります。
 * - This plugin is Japanese help only.
 * 
 * ▼ 本プラグイン導入手順
 *  - 本プラグインを実行するには、キャラクター生成用の画像ファイルが必要です。
 *  - 実行前にヘルプ上のURLを参考にgeneratorフォルダを移してください。
 *  - テストプレイを行った際、generatorフォルダ内にキャラクター生成用のファイル
 *    [chargene.json]が作成されます。
 *  - このファイルがないと動作しないので、generatorフォルダ内を変更した際には
 *    必ず一度はテストプレイを実行してください。
 *  - 容量削減のため、generatorフォルダ内の使用しないファイルは
 *    削除してください。
 *  - 子供のキャラクター生成を行わなければ、すべてのKidフォルダが不要です。
 *  - フロントビューであれば、SVフォルダは不要です。
 * 
 * ▼ アクターのメモ欄
 *  〇 <GeneKind:kind>
 *   - デフォルトの基礎タイプを設定します。
 *   - 基礎タイプを設定することで、アクターの画像がキャラメイク用の画像に
 *     変更されます。
 * 
 *  〇 <GeneDefaultParts:p1,p2,...p20>
 *   - デフォルトのパーツを一括で設定します。
 *   - カンマで区切った20個の数値を設定してください。
 *   - 必要な数値は MPP_CharacterMake_Op1 で取得できます。
 * 
 * ▼ 職業・武器・防具のメモ欄
 *  - オブジェクトの優先順位は『装備品（上から順） > 職業』です。
 * 
 *  〇 <GeneParts PARTS:id> / <GeneParts PARTS KIND:id>
 *       PARTS : パーツ名
 *       KIND  : 基礎タイプ
 *       id    : パーツID
 *   - このコマンドが設定されたオブジェクトをアクターが持った場合、
 *     指定したパーツを変更します。
 *   - [基礎タイプ]を指定した場合、その[基礎タイプ]のみに適用されます。
 *       例: <GeneParts Clothing:1>  => Clothing(服)のパーツIDを1に設定
 *           <GeneParts AccA Male:2>
 *               => 基礎タイプ Male の場合、AccA(装身具1)のパーツIDを2に設定
 * 
 *  〇 <GeneColor NUMBER:id> /
 *     <GeneColor NUMBER KIND:id> /
 *     <GeneColor NUMBER:-1, r, g, b> /
 *     <GeneColor NUMBER KIND:-1, r, g, b>
 *       NUMBER : パーツ色番号
 *       KIND   : 基礎タイプ
 *       id     : 色ID
 *   - このコマンドが設定されたオブジェクトをアクターが持った場合、
 *     指定したパーツ色番号を変更します。
 *   - [色ID]ではグラデーション画像の色(上から順に0,1,2...)を指定します。
 *   - [色ID]を0にした場合、一番上のグラデーション色ではなく、
 *     デフォルト色(色変更なし)が適用されます。
 *   - [色ID]を-1にした場合、RGB値を指定することができます。
 *   - [基礎タイプ]を指定した場合、その[基礎タイプ]のみに適用されます。
 *       例: <GeneColor 3:1>  => パーツ色番号3(毛の色)の色IDを1に設定
 * 
 * ▼ プラグインコマンド 詳細
 *  〇 アクターの倒れキャラ切り替え(switchActorDamageTV) /
 *      パーティメンバーの倒れキャラ切り替え(switchPartyDamageTV)
 *   - 対象となるアクターの歩行グラフィックを
 *     倒れキャラ(もしくは通常の歩行キャラ)に変更します。
 *   - 倒れキャラの具体的なイメージはRPGツクールMZのキャラクター生成を
 *     参照してください。
 *   - 左から順に下向き、左向き、右向きに割り当てられます。
 * 
 * ▼ 各パラメータ詳細
 *  〇 基礎タイプ
 *   Male   : 男性
 *   Female : 女性
 *   Kid    : 子供
 *   - 基礎タイプが設定されたキャラクターは、キャラクターメイクを行った画像に
 *     切り替わります。
 *   - 通常の画像ファイルを使用したい場合は、基礎タイプを未設定にしてください。
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
 *  〇 パーツ色番号
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
 *  〇 グラデーション画像 対応パーツ色
 *   grad_hair.png   : 毛の色, 後髪のサブカラー, 獣耳の色, 尻尾の色
 *   grad_skin.png   : 肌の色
 *   grad_eyes.png   : 目の色
 *   grad_common.png : 上記以外
 *   - 各画像の高さを変えることで、グラデーション色の数を
 *     増減させることができます。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @command setActorKind
 *      @text 基礎タイプ設定
 *      @desc 
 *      @arg actorId
 *          @text アクターID
 *          @desc 
 *          @type actor
 *          @default 0
 *      @arg kind
 *          @text 基礎タイプ
 *          @desc none:なし, Male:男性, Female:女性, Kid:子供
 *          @type select
 *              @option none
 *              @option Male
 *              @option Female
 *              @option Kid
 *          @default Male
 * 
 *  @command switchActorDamageTV
 *      @text アクターの倒れキャラ切り替え
 *      @desc 
 *      @arg actorIds
 *          @text アクターの配列
 *          @desc 
 *          @type actor[]
 *          @default []
 *      @arg damage
 *          @text 倒れ
 *          @desc 
 *          @type boolean
 *          @default false
 * 
 *  @command switchPartyDamageTV
 *      @text パーティメンバーの倒れキャラ切り替え
 *      @desc 
 *      @arg target
 *          @text 対象
 *          @desc 
 *          @type select
 *              @option 先頭のみ
 *                  @value top
 *              @option メンバー全員
 *                  @value all members
 *          @default all members
 *      @arg damage
 *          @text 倒れ
 *          @desc 
 *          @type boolean
 *          @default false
 * 
 *  @command Op1:callCharMake
 *      @text Op1:キャラクターメイク画面呼び出し
 *      @desc オプション1必須。キャラクターメイクが行えるのは[基礎タイプ]が設定されているアクターのみです。
 *      @arg actorId
 *          @text アクターID
 *          @desc 
 *          @type actor
 *          @default 0
 *      @arg random
 *          @text ランダム
 *          @desc 
 *          @type boolean
 *          @default false
 * 
 * 
 *  @command Op1:changePartsRandom
 *      @text Op1:パーツランダム
 *      @desc オプション1必須。アクターの見た目をランダムで変更します。
 *      @arg actorId
 *          @text アクターID
 *          @desc 
 *          @type actor
 *          @default 0
 * 
 * 
 * 
 *  @param Base Kinds
 *      @text 基礎タイプ
 *      @desc 使用しない基礎タイプを削除する必要はありません。
 * 基礎タイプを追加したい場合のパラメータです。
 *      @type string[]
 *      @default ["Male", "Female", "Kid"]
 *
 */

(() => {
    'use strict';
    
    const pluginName = 'MPP_CharacterMake';

    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const param_BaseKinds = JSON.parse(parameters['Base Kinds'] || '[]');

    // Dealing with other plugins
    const __base = (obj, prop) => {
        if (obj.hasOwnProperty(prop)) {
            return obj[prop];
        } else {
            const proto = Object.getPrototypeOf(obj);
            return function () { return proto[prop].apply(this, arguments); };
        }
    };

    const DATABASE = {
        kinds: param_BaseKinds,
        icon: [
            'Body', 'body', 'Face', 'FrontHair', 'RearHair', 'Beard', 'Ears', 'Eyes', 'Eyebrows', 'Nose', 'Mouth', 'FacialMark', 'BeastEars', 'Tail', 'Wing', 'Clothing', 'Cloak', 'AccA', 'AccB', 'Glasses'
        ],
        TVD: [
            'Body', 'FacialMark', 'Clothing','Beard', 'Tail', 'Cloak', 'Glasses', 'Wing', 'RearHair', 'BeastEars', 'Eyes', 'AccA', 'FrontHair', 'AccB'
        ],
        TV: [
            'Wing2', 'Cloak2', 'Tail2', 'FrontHair2', 'Beard2', 'Body', 'FacialMark', 'RearHair2', 'Clothing2', 'Beard1', 'Clothing1', 'Tail1', 'Cloak1', 'BeastEars', 'Glasses', 'RearHair1', 'AccA', 'FrontHair1', 'AccB', 'Wing1'
        ],
        SV: [
            'Wing', 'Cloak2', 'Tail', 'body', 'FacialMark', 'RearHair1', 'Clothing2', 'Beard', 'Clothing1', 'Cloak1', 'BeastEars', 'Ears', 'Glasses', 'AccA', 'FrontHair', 'AccB'
        ],
        FG: [
            'RearHair2', 'Cloak2', 'Body', 'Clothing2', 'Face', 'Mouth', 'Nose', 'FacialMark', 'Eyes', 'Eyebrows', 'RearHair1', 'Ears', 'Clothing1', 'Beard', 'BeastEars', 'AccA', 'Cloak1', 'FrontHair', 'Glasses', 'AccB'
        ],
        forceParts: new Set(['Body', 'body', 'Face', 'Ears', 'Eyes', 'Eyebrows', 'Nose', 'Mouth']),
        partsColorNumbers: {
            Face: [1], FrontHair: [3], RearHair: [3, 4], Beard: [3], Ears: [1], Eyes: [2], Eyebrows: [3], Nose: [1], Mouth: [1], FacialMark: [5], BeastEars: [6], Tail: [23], Wing: [24], Clothing: [7, 8, 9, 10], Cloak: [11, 12], AccA: [13, 14, 15], AccB: [16, 17, 18, 19], Glasses: [20, 21, 22]
        },
        gradients: {
            grad_hair: [3, 4, 6, 23], grad_skin: [1], grad_eyes: [2]
        },
        colors: [
            '255,255,255', '249,193,157', '44,128,203', '252,203,10', '184,146,197', '0,146,150', '211,206,199', '174,134,130', '254,157,30', '28,118,208', '217,164,4', '216,172,0', '163,7,8', '211,206,194', '218,52,110', '164,201,17', '199,132,7', '192,211,210', '65,85,182', '186,59,69', '153,153,153', '204,186,210', '96,126,75', '230,214,189', '167,214,214'
        ],
    };
    
    // 確認済みエラーカラー。多すぎてこれ以上の記載は面倒です。
    const _errorColors = {
        '79,65,60':0, // 下着の色
        '58,48,44':0, // SV/Female/SV_body_p01_c, X:230, Y:49

        '155,121,94':0, // TV/Male/TV_Clothing2_p01_c, X:33, Y37
        '200,143,126':8, // TV/Male/TV_Clothing2_p03_c, X:69, Y:44
        '253,253,253':0, // TV/Male/TV_Clothing2_p06_c, X:71, Y:37
        '201,145,111':9, // TV/Male/TV_Clothing2_p07_c.png, X:33, Y:33
        '228,136,9':9, // SV/Male/SV_Clothing2_p02_c, X:405, Y:375
        '251,220,200':1, // SV/Male/SV_Clothing2_p12_c, X:290, Y:45
        '234,151,119':1, // SV/Male/SV_Clothing2_p12_c, X:28, Y:234
        '244,255,254':0, // SV/Male/SV_Clothing2_p14_c, X:208, Y:40
        '251,253,254':7, // SV/Male/SV_Clothing2_p17_c, X:40, Y:38
        '254,254,254':0, // SV/Male/SV_Clothing2_p22_c, X:449, Y:0
        '150,75,31':1, // SV/Male/SV_Clothing2_p26_c, X:524, Y:90
        '146,215,197':24, // SV/Male/SV_Wing_p04_c, X:426, Y:371
        '119,72,0':16, // SV/Male/SV_AccB_p03_c, X:446, Y:15

        '241,252,255':0, // TV/Male/TV_Clothing2_p27_c, X:67, Y:35
        '32,29,26':7, // SV/Male/SV_Clothing2_p28_c, X:232, Y:311

        '253,251,239':0, // TV/Female/TV_Clothing2_p22_c, X:61, Y:33
        '252,252,250':0, // TV/Female/TV_Clothing2_p25_c, X:62, Y:33
        '125,145,134':0, // SV/Female/SV_FrontHair_p10_c, X:527, Y:89
        '138,84,13':3, // SV/Female/SV_RearHair1_p17_c, X:25, Y:361
        '173,130,0':3, // SV/Female/SV_RearHair1_p17_c, X:26, Y:363
        '208,131,46':0, // SV/Female/SV_Clothing2_p03_c, X:413, Y:378
        '157,146,116':0, // SV/Female/SV_Clothing2_p09_c, X:293, Y:250
        '79,113,169':7, // SV/Female/SV_Clothing2_p10_c, X:23, Y:40
        '112,112,94':0, // SV/Female/SV_Clothing2_p17_c, X:83, Y:60
        '220,176,16':11, // SV/Female/SV_Cloak2_p02_c, X:24, Y:39
        
        '251,249,250':0, // SV/Female/SV_Clothing1_p28_c, X:214, Y:42
    };
    const _errorCheck = false;

    /**
     * 配列の一致判定。
     * 
     * @param {array} ary1 - 配列1。
     * @param {array} ary2 - 配列2。
     * @returns {boolean}
     */
    function array_equals(ary1, ary2) {
        return JSON.stringify(ary1) === JSON.stringify(ary2);
    }

    // Utils
    Utils.hasEncryptedImagesForGenerator = function() {
        // MZでは暗号化しても generator フォルダ内の画像は暗号化されない。
        // 今後変更の可能性もあるため、一時的に無効化。
        return false;// this.hasEncryptedImages();
    }

    //-------------------------------------------------------------------------
    // PluginManager
    
    PluginManager.registerCommand(pluginName, 'setActorKind', args => {
        const actorId = PluginManager.mppValue(args.actorId);
        const actor = $gameActors.actor(actorId);
        if (actor) {
            const kind = args.kind === 'none' ? null : args.kind;
            actor.setGeneKind(kind);
        }
    });

    PluginManager.registerCommand(pluginName, 'switchActorDamageTV', function(args) {
        this._charGeneActors = JSON.parse(args.actorIds)
            .map(actorId => $gameActors.actor(actorId))
            .filter(actor => actor && actor.geneKind());
        if (this._charGeneActors.length > 0) {
            this._waitMode = 'GeneDamage';
            this._charGeneDamage = args.damage === 'true';
            for (const actor of this._charGeneActors) {
                const paramsStr = actor.geneParamsString();
                const charType = (this._charGeneDamage ? 'TVD|' : 'TV|');
                const characterName = '$MppGene' + charType + paramsStr;
                ImageManager.loadCharacter(characterName);
            }
        }
    });

    PluginManager.registerCommand(pluginName, 'switchPartyDamageTV', function(args) {
        if (args.target === 'top') {
            this._charGeneActors = [$gameParty.leader()];
        } else {
            this._charGeneActors = $gameParty.allMembers();
        }
        this._charGeneActors = this._charGeneActors
            .filter(actor => actor && actor.geneKind());
        if (this._charGeneActors.length > 0) {
            this._waitMode = 'GeneDamage';
            this._charGeneDamage = args.damage === 'true';
            for (const actor of this._charGeneActors) {
                const paramsStr = actor.geneParamsString();
                const charType = (this._charGeneDamage ? 'TVD|' : 'TV|');
                const characterName = '$MppGene' + charType + paramsStr;
                ImageManager.loadCharacter(characterName);
            }
        }
    });

    PluginManager.mppValue = function(value) {
        const match = /^V\[(\d+)\]$/i.exec(value);
        return match ? $gameVariables.value(+match[1]) : +value;
    };
    
    //-------------------------------------------------------------------------
    // CharGenerator

    window.CharGenerator = {
        DATABASE: DATABASE,
        _tempCanvas: null,
        _entries: new Map(),
        _images: {},
        _colors: {},

        isCreateEdit() {
            return Utils.isOptionValid('test') && Utils.isNwjs();
        },

        defaultGeneParts() {
            return [1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,1,0,0,0,0];
        },
    
        defaultGeneColors() {
            return new Array(24).fill([0, 136,136,136]).flat();
        },
        
        checkForceParts(parts, kind) {
            const list = $dataCharGene.icon[kind];
            if (!list) return parts;
            const { icon, forceParts } = DATABASE;
            return parts.map((partsId, i) => {
                const partsName = icon[i];
                if (
                    partsId === 0 &&
                    forceParts.has(partsName) &&
                    list[partsName].length > 0
                ) {
                    return list[partsName][0];
                }
                return partsId;
            });
        },

        getTempCanvas(width, height) {
            if (!this._tempCanvas) {
                this._tempCanvas = document.createElement('canvas');
            }
            const canvas = this._tempCanvas;
            if (canvas.width < width) {
                canvas.width = width;
            }
            if (canvas.height < height) {
                canvas.height = height;
            }
            return canvas;
        },
    
        loadGradients() {
            this._gradients = {};
            for (const fileName of ['grad_hair', 'grad_skin', 'grad_eyes', 'grad_common']) {
                const url = `generator/${Utils.encodeURI(fileName)}.png`;
                this._gradients[fileName] = new GenerateImage(url);
            }
        },
    
        getGradients(colorNumber) {
            for (const fileName of ['grad_hair', 'grad_skin', 'grad_eyes']) {
                if (DATABASE.gradients[fileName].includes(colorNumber)) {
                    return this._gradients[fileName];
                }
            }
            return this._gradients.grad_common;
        },
    
        addEntry(key, entry) {
            this._entries.set(key, entry);
        },
    
        getImage(type, kind, filename) {
            const cache = this._images;
            const url = `generator/${type}/${kind}/${Utils.encodeURI(filename)}.png`;
            if (!(url in cache)) {
                cache[url] = new GenerateImage(url);
            }
            return cache[url];
        },
        
        getColor(type, kind, filename) {
            const cache = this._colors;
            const url = `generator/${type}/${kind}/${Utils.encodeURI(filename)}_c.png`;
            if (!(url in cache)) {
                cache[url] = new GenerateColor(url);
            }
            return cache[url];
        },
        
        update() {
            this.updateEntries();
        },
    
        updateEntries() {
            for (const [key, entry] of this._entries) {
                entry.onGenerate();
                if (entry.isReady()) {
                    this._entries.delete(key);
                }
            }
        },
    
        clear() {
            this._entries.clear();
            this._images = {};
        },
    
        isReady() {
            return this._entries.size === 0;
        },

    };

    //-------------------------------------------------------------------------
    // GeneratorEntry

    class GeneratorEntry {
        constructor(type, params) {
            this._type = type;
            this._params = params;
            this._loaded = false;
        }
        
        setup(bitmap) {
            const type = this._type;
            const { kind, parts, colors } = this._params;
            const filenames = this.getFileNames(type, kind, parts);
            this._bitmap = bitmap;
            this._geneImages = this.createGeneImages(filenames, type, kind);
            this._geneColors = this.createGeneColors(filenames, type, kind);
            this._defaultColors = this.getDefaultColors(colors);
            this._gradData = this.getGradData(colors);
            this._index = 0;
        }

        getFileNames(type, kind, currentParts) {
            const icon = DATABASE.icon;
            const stackingOrder = DATABASE[type];
            const kindList = $dataCharGene[type][kind];
            const faceOrder = $dataCharGene.FaceOrder;
            const isFace = type === 'FG';
            return stackingOrder.reduce((r, partsName) => {
                const baseName = this.getPartsBaseName(partsName);
                const partsIndex = icon.indexOf(baseName);
                const partsId = partsIndex >= 0 ? currentParts[partsIndex] : 0;
                const partsList = kindList[partsName];
                if (partsList && partsList.includes(partsId)) {
                    if (!isFace) {
                        r.push(`${type}_${partsName}_p${partsId.padZero(2)}`);
                    } else {
                        r.push(...faceOrder[`${kind},${partsName},${partsId}`]);
                    }
                }
                return r;
            }, []);
        }

        getPartsBaseName(name) {
            return /\d$/.test(name) ? name.slice(0,-1) : name;
        }

        createGeneImages(filenames, type, kind) {
            const fileType = type === 'FG' ? 'Face' : type;
            return filenames.map(
                filename => CharGenerator.getImage(fileType, kind, filename)
            );
        }

        createGeneColors(filenames, type, kind) {
            const isFace = type === 'FG';
            return filenames.map(filename => {
                return isFace
                    ? this.getFilenameColorIndex(filename)
                    : CharGenerator.getColor(type, kind, filename);
            });
        }

        getFilenameColorIndex(filename) {
            const match = /_m(\d\d\d)/.exec(filename);
            return match ? +match[1] : 0;
        }

        getDefaultColors(currentColors) {
            return new Set(
                [...Array(24).keys()].filter(i => currentColors[i * 4] === 0)
            ).add(-1);
        }

        getGradData(currentColors) {
            const defColors = this._defaultColors;
            const tempCanvas = CharGenerator.getTempCanvas(256, 24);
            const tempContext = tempCanvas.getContext('2d');
            tempContext.globalCompositeOperation = 'source-over';
            for (let n = 0; n < 24; n++) {
                if (defColors.has(n)) continue;
                const ci = currentColors[n * 4];
                if (ci >= 0) {
                    const image = CharGenerator.getGradients(n + 1).image;
                    tempContext.drawImage(image, 0, ci * 4, 256, 1, 0, n, 256, 1);
                } else {
                    const rgb = currentColors.slice(n * 4 + 1, n * 4 + 4);
                    const grad = tempContext.createLinearGradient(0, 0, 256, 0);
                    grad.addColorStop(0, '#fff');
                    grad.addColorStop(0.5, `rgb(${rgb})`);
                    grad.addColorStop(1, '#000');
                    tempContext.fillStyle = grad;
                    tempContext.fillRect(0, n, 256, 1);
                }
            }
            return tempContext.getImageData(0, 0, 256, 24).data;
        }

        onGenerate() {
            const isFace = this._type === 'FG';
            while (this._geneImages.length > this._index) {
                const i = this._index;
                const image = this._geneImages[i];
                const color = this._geneColors[i];
                if (!image.isReady() || (!isFace && !color.isReady())) {
                    return;
                }
                const colorData = isFace ? [Infinity, color] : color.colorData();
                const tempCanvas = this.getCanvasWithChangedTone(image, colorData);
                const context = this._bitmap.context;
                context.globalCompositeOperation = i === 0 ? 'copy' : 'source-over';
                context.drawImage(tempCanvas, 0, 0);
                this._index++;
            }
            this.endGenerate();
        }

        getCanvasWithChangedTone(gameImage, colorData) {
            const imageData = gameImage.imageData();
            this.changeImageData(imageData, colorData);
            const width = imageData.width;
            const height = imageData.height;
            const tempCanvas = CharGenerator.getTempCanvas(width, height);
            const tempContext = tempCanvas.getContext('2d');
            tempContext.putImageData(imageData, 0, 0);
            return tempCanvas;
        }
    
        changeImageData(imageData, colorData) {
            const defColors = this._defaultColors;
            const gradData = this._gradData;
            const data = imageData.data;
            const max = data.length;
            const rgbToL = (r, g, b) => {
                return Math.floor((Math.min(r, g, b) + Math.max(r, g, b)) / 2);
            };
            let cn = -1;
            let ci = 0;
            let di = 0;
            for (let n = 0; n < max; n += 4) {
                if (cn < n) {
                    if (colorData.length === di) return;
                    cn = colorData[di++];
                    ci = colorData[di++] - 1;
                    if (defColors.has(ci)) {
                        n = cn;
                        continue;
                    }
                }
                if (data[n + 3] === 0) continue;
                const l = rgbToL(data[n], data[n + 1], data[n + 2]);
                const m = (ci * 256 + 255 - l) * 4;
                data[n] = gradData[m];
                data[n + 1] = gradData[m + 1];
                data[n + 2] = gradData[m + 2];
            }
        }
    
        endGenerate() {
            if (!this._loaded) {
                this._bitmap.endGenerate();
                delete this._geneImages;
                delete this._geneColors;
                delete this._defaultColors;
                delete this._gradData;
                delete this._bitmap;
                delete this._index;
                this._loaded = true;
            }
        }

        isReady() {
            return this._loaded;
        }

    }

    //-------------------------------------------------------------------------
    // GenerateImage

    class GenerateImage {
        constructor(url) {
            this._url = url;
            this._loadingState = 'none';
            this.startLoading();
        }

        get image() {
            return this._image;
        }

        get width() {
            return this._url.startsWith('generator/Face')
                ? ImageManager.faceWidth
                : this._image.width;
        }

        get height() {
            return this._url.startsWith('generator/Face')
                ? ImageManager.faceHeight
                : this._image.height;
        }

        startLoading() {
            this._image = new Image();
            this._image.onload = this._onLoad.bind(this);
            this._image.onerror = this._onError.bind(this);
            this._loadingState = 'loading';
            if (Utils.hasEncryptedImagesForGenerator()) {
                this._startDecrypting();
            } else {
                this._image.src = this._url;
            }
        }
        
        _startDecrypting() {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', this._url + '_');
            xhr.responseType = 'arraybuffer';
            xhr.onload = () => this._onXhrLoad(xhr);
            xhr.onerror = this._onError.bind(this);
            xhr.send();
        }

        _onXhrLoad(xhr) {
            if (xhr.status < 400) {
                const arrayBuffer = Utils.decryptArrayBuffer(xhr.response);
                const blob = new Blob([arrayBuffer]);
                this._image.src = URL.createObjectURL(blob);
            } else {
                this._onError();
            }
        }

        isReady() {
            return this._loadingState === 'loaded';
        }

        isError() {
            return this._loadingState === 'error';
        }

        imageData() {
            const width = this.width;
            const height = this.height;
            const image = this._image;
            const dx = (width - image.width) / 2;
            const dy = (height - image.height) / 2;
            const tempCanvas = CharGenerator.getTempCanvas(width, height);
            const tempContext = tempCanvas.getContext('2d');
            tempContext.globalCompositeOperation = 'copy';
            tempContext.drawImage(image, dx, dy);
            return tempContext.getImageData(0, 0, width, height);
        }

        _onLoad() {
            if (Utils.hasEncryptedImagesForGenerator()) {
                URL.revokeObjectURL(this._image.src);
            }
            this._loadingState = 'loaded';
        }
        
        _onError() {
            this._loadingState = 'error';
        }

    }

    //-------------------------------------------------------------------------
    // GenerateColor

    class GenerateColor extends GenerateImage {
        static _errorRGB = new Set();

        static hasErrorRgb(rgb) {
            return this._errorRGB.has(rgb);
        }
    
        static addError(rgb) {
            this._errorRGB.add(rgb);
        }
    
        colorData() {
            return this._colorData;
        }

        _onLoad() {
            this._colorData = this.compressData(this.imageData().data);
            delete this._image;
            super._onLoad();
        }

        compressData(imageData) {
            const result = [];
            let lastNumber = 0;
            for (let i = 0; i < imageData.length; i += 4) {
                const rgb = `${imageData[i]},${imageData[i + 1]},${imageData[i + 2]}`;
                const number = this.getColorNumber(rgb, i);
                if (lastNumber !== number) {
                    result.push(i - 4, lastNumber);
                    lastNumber = number;
                }
            }
            return result;
        }

        getColorNumber(rgb, i) {
            const index = DATABASE.colors.indexOf(rgb);
            if (index >= 0) {
                return index;
            }
            if (rgb in _errorColors) {
                return _errorColors[rgb];
            }
            if (_errorCheck && !GenerateColor.hasErrorRgb(rgb)) {
                this.outputErrorRgb(rgb, i / 4);
            }
            return 0;
        }

        outputErrorRgb(rgb, n) {
            const width = Math.max(this._image.width || 0, 1);
            const x = n % width;
            const y = Math.floor(n / width);
            const fileName = this._url.slice(this._url.indexOf('/') + 1, -4);
            GenerateColor.addError(rgb);
            console.log(`File Name: ${fileName}, X:${x}, Y:${y}, RGB:'${rgb}'`);
        }

        _onError() {
            this._colorData = [Infinity, 0];
            this._loadingState = 'loaded';
            delete this._image;
        }

    }

    //-------------------------------------------------------------------------
    // Bitmap

    const _Bitmap__startLoading = Bitmap.prototype._startLoading;
    Bitmap.prototype._startLoading = function() {
        if (this._url.startsWith('generator/')) {
            this._image = new Image();
            this._image.onload = this._onLoad.bind(this);
            this._image.onerror = this._onError.bind(this);
            this._destroyCanvas();
            this._loadingState = "loading";
            if (Utils.hasEncryptedImagesForGenerator()) {
                this._startDecrypting();
            } else {
                this._image.src = this._url;
            }
        } else {
            _Bitmap__startLoading.apply(this, arguments);
        }
    };
    
    const _Bitmap__onLoad = Bitmap.prototype._onLoad;
    Bitmap.prototype._onLoad = function() {
        if (this._url.startsWith('generator/')) {
            if (Utils.hasEncryptedImagesForGenerator()) {
                URL.revokeObjectURL(this._image.src);
            }
            this._loadingState = "loaded";
            this._createBaseTexture(this._image);
            this._callLoadListeners();
        } else {
            _Bitmap__onLoad.apply(this, arguments);
        }
    };
    
    Bitmap.generate = function(type) {
        const bitmap = Object.create(Bitmap.prototype);
        bitmap.initialize();
        bitmap._geneType = type;
        bitmap.setupGeneratorSize(type);
        return bitmap;
    };

    Bitmap.prototype.setupGeneratorSize = function(type) {
        switch (type) {
            case 'TVD':
            case 'TV':
                this.resize(48 * 3, 48 * 4);
                break;
            case 'SV':
                this.resize(576, 384);
                break;
            case 'FG':
                this.resize(ImageManager.faceWidth, ImageManager.faceHeight);
                break;
        }
    };

    Bitmap.prototype.setupGenerator = function(params) {
        if (!this.equalsGeneParams(params)) {
            //this.context.clearRect(0, 0, this.width, this.height);
            this.addGeneratorEntry(params);
            this._geneParams = params;
            this._loadingState = 'generateLoading';
        }
    };

    Bitmap.prototype.equalsGeneParams = function(params) {
        const geneParams = this._geneParams;
        if (!geneParams) return false;
        return (
            geneParams.kind === params.kind &&
            array_equals(geneParams.parts, params.parts) &&
            array_equals(geneParams.colors, params.colors)
        );
    };

    Bitmap.prototype.addGeneratorEntry = function(params) {
        const entry = new GeneratorEntry(this._geneType, params);
        entry.setup(this);
        CharGenerator.addEntry(params.key, entry);
    };

    Bitmap.prototype.endGenerate = function() {
        this._loadingState = 'loaded';
        if (this._geneType === 'TVD') {
            this.adjustTVD();
        }
        this._baseTexture.update();
        this._callLoadListeners();
    };

    Bitmap.prototype.adjustTVD = function() {
        const bw = Math.floor(this.width / 3);
        const bh = Math.floor(this.height / 4);
        const context = this.context;
        const canvas = this.canvas;
        context.globalCompositeOperation = 'source-over';
        context.drawImage(canvas, bw, 0, bw, bh, 0, bh, bw, bh);
        context.drawImage(canvas, bw * 2, 0, bw, bh, 0, bh * 2, bw, bh);
        this.context.clearRect(bw, 0, bw * 2, bh);
        context.drawImage(canvas, 0, 0, bw, bh * 3, bw, 0, bw, bh * 3);
        context.drawImage(canvas, 0, 0, bw, bh * 3, bw * 2, 0, bw, bh * 3);
    };

    //-------------------------------------------------------------------------
    // DataManager

    window.$dataCharGene = null;

    const _DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function() {
        _DataManager_loadDatabase.apply(this, arguments);
        if (CharGenerator.isCreateEdit()) {
            this.createEditData();
        } else {
            this.loadGeneData('$dataCharGene', 'chargene.json');
        }
    };

    DataManager.createEditData = function() {
        $dataCharGene = {
            icon: this.createGenePartsList('icon', 'Variation'),
            TVD: this.createGenePartsList('TVD'),
            TV: this.createGenePartsList('TV'),
            SV: this.createGenePartsList('SV'),
            FG: this.createGenePartsList('FG', 'Face'),
            FaceOrder: this.createGeneFaceOder()
        };
        StorageManager.saveGeneObject($dataCharGene);
    };

    DataManager.createGenePartsList = function(type, folderName) {
        folderName = folderName || type;
        const result = {};
        for (const kind of param_BaseKinds) {
            result[kind] = this.getKindPartsIds(folderName, type, kind);
        }
        return result;
    };

    DataManager.getKindPartsIds = function(folderName, type, kind) {
        const dirName = `${folderName}/${kind}/`;
        const allFileNames = StorageManager.geneReadFileNames(dirName);
        const result = {};
        if (allFileNames && type in DATABASE) {
            for (const partsName of DATABASE[type]) {
                const regexp = new RegExp(`^${type}_${partsName}_p(\\d+)`);
                result[partsName] = this.getPartsIds(allFileNames, regexp);
            }
        } else {
            console.log('フォルダーなし : ' + dirName);
        }
        return result;
    };

    DataManager.getPartsIds = function(allFileNames, regexp) {
        const partsIdSet = allFileNames.reduce((r, fileName) => {
            const match = regexp.exec(fileName);
            return match ? r.add(+match[1]) : r;
        }, new Set());
        return [...partsIdSet].sort((a, b) => a - b);
    };

    DataManager.createGeneFaceOder = function() {
        return Object.assign(
            {},
            ...param_BaseKinds.map(kind => this.getKindFaceOder(kind))
        );
    };

    DataManager.getKindFaceOder = function(kind) {
        const result = {};
        const dirName = `Face/${kind}/`;
        const allFileNames = StorageManager.geneReadFileNames(dirName);
        if (allFileNames) {
            const regexp = /^FG_(\w+?)_p(\d+)/;
            for (const fileName of allFileNames.sort()) {
                const match = regexp.exec(fileName);
                if (match) {
                    const key = `${kind},${match[1]},${+match[2]}`;
                    if (!(key in result)) result[key] = [];
                    result[key].unshift(fileName.slice(0, -4));
                }
            }
        } else {
            console.log('フォルダーなし : ' + dirName);
        }
        return result
    };
    
    const _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!CharGenerator.isCreateEdit() && !window['$dataCharGene']) {
            return false;
        }
        return _DataManager_isDatabaseLoaded.apply(this, arguments);
    };

    DataManager.loadGeneData = function(name, src) {
        const xhr = new XMLHttpRequest();
        const url = 'generator/' + src;
        window[name] = null;
        xhr.open('GET', url);
        xhr.overrideMimeType('application/json');
        xhr.onload = () => this.onXhrLoad(xhr, name, src, url);
        xhr.onerror = () => this.onXhrError(name, src, url);
        xhr.send();
    };

    //-------------------------------------------------------------------------
    // StorageManager

    StorageManager.geneReadFileNames = function(dirName) {
        const fs = require('fs');
        const dirPath = this.geneDirectoryPath() + dirName;
        return fs.existsSync(dirPath) ? fs.readdirSync(dirPath) : null;
    };
    
    StorageManager.geneDirectoryPath = function() {
        const path = require('path');
        const base = path.dirname(process.mainModule.filename);
        return path.join(base, 'generator/');
    };
    
    StorageManager.saveGeneObject = function(object) {
        this.objectToJson(object).then(json => this.saveGeneJson(json));
    };

    StorageManager.saveGeneJson = function(json) {
        const dirPath = this.geneDirectoryPath();
        const filePath = dirPath + 'chargene.json';
        const backupFilePath = filePath + '_';
        return new Promise((resolve, reject) => {
            this.fsMkdir(dirPath);
            this.fsUnlink(backupFilePath);
            this.fsRename(filePath, backupFilePath);
            try {
                this.fsWriteFile(filePath, json);
                this.fsUnlink(backupFilePath);
                resolve();
            } catch (e) {
                try {
                    this.fsUnlink(filePath);
                    this.fsRename(backupFilePath, filePath);
                } catch (e2) {
                    //
                }
                reject(e);
            }
        });
    };

    //-------------------------------------------------------------------------
    // ImageManager

    ImageManager._saveGenerator = null;

    ImageManager.createSaveGeneratorCache = function() {
        this._saveGenerator = {};
    };

    ImageManager.deleteSaveGeneratorCache = function() {
        if (this._saveGenerator) {
            const cache = this._saveGenerator;
            for (const url in cache) {
                cache[url].destroy();
            }
        }
        this._saveGenerator = null;
    };

    const _ImageManager_loadCharacter = ImageManager.loadCharacter;
    ImageManager.loadCharacter = function(filename) {
        const match = /^\$MppGene(TVD|TV)/.exec(filename);
        return match
            ? this.loadGeneratorBitmap(filename, match[1])
            : _ImageManager_loadCharacter.apply(this, arguments);
    };

    const _ImageManager_loadFace = ImageManager.loadFace;
    ImageManager.loadFace = function(filename) {
        return /^MppGeneFG/.test(filename)
            ? this.loadGeneratorBitmap(filename, 'FG')
            : _ImageManager_loadFace.apply(this, arguments);
    };

    const _ImageManager_loadSvActor = ImageManager.loadSvActor;
    ImageManager.loadSvActor = function(filename) {
        return /^MppGeneSV/.test(filename)
            ? this.loadGeneratorBitmap(filename, 'SV')
            : _ImageManager_loadSvActor.apply(this, arguments);
    };

    ImageManager.loadGeneratorBitmap = function(filename, type) {
        const params = this.makeGenerateParams(filename);
        const bitmap = this.loadGeneratorBitmapFromKey(params.key, type);
        bitmap.setupGenerator(params);
        return bitmap;
    };

    ImageManager.loadGeneratorBitmapFromKey = function(key, type) {
        const cache = this._saveGenerator || this._cache;
        if (!(key in cache)) {
            cache[key] = Bitmap.generate(type);
        }
        return cache[key];
    };
    
    ImageManager.makeGenerateParams = function(filename) {
        const [ header, params ] = filename.split('|');
        const [ actorId, kind, parts, colors ] = JSON.parse(params);
        const key = this._saveGenerator ? filename : header + actorId;
        return { key, actorId, kind, parts, colors };
    };

    const _ImageManager_clear = ImageManager.clear;
    ImageManager.clear = function() {
        _ImageManager_clear.apply(this, arguments);
        CharGenerator.clear();
    };
    
    const _ImageManager_isReady = ImageManager.isReady
    ImageManager.isReady = function() {
        return (
            _ImageManager_isReady.apply(this, arguments) &&
            CharGenerator.isReady()
        );
    };

    //-------------------------------------------------------------------------
    // SceneManager

    const _SceneManager_updateMain = SceneManager.updateMain;
    SceneManager.updateMain = function() {
        _SceneManager_updateMain.apply(this, arguments);
        CharGenerator.update();
    };

    //-------------------------------------------------------------------------
    // Game_Actor

    const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
    Game_Actor.prototype.initMembers = function() {
        _Game_Actor_initMembers.apply(this, arguments);
        this._geneCharacterName = '';
        this._geneFaceName = '';
        this._geneBattlerName =  '';
        this._geneKind = null;
        this._geneParts = [];
        this._geneColors = [];
        this._geneCharacterDamage = false;
    };

    const _Game_Actor_setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function(actorId) {
        _Game_Actor_setup.apply(this, arguments);
        this.initGeneKind();
        this.initGeneParts();
    };

    Game_Actor.prototype.initGeneKind = function() {
        this._geneKind = this.actor().meta['GeneKind'];
    };

    Game_Actor.prototype.initGeneParts = function() {
        const kind = this._geneKind;
        if (kind) {
            const geneColors = CharGenerator.defaultGeneColors();
            const traits = [this.actor()];
            this._geneParts = this.defaultGeneParts(kind);
            this._geneColors = this.applyTraitsGeneColors(geneColors, traits, kind);
        } else {
            this._geneParts = [];
            this._geneColors = [];
        }
        this._geneCharacterDamage = false;
        this.refreshImageName();
    };

    Game_Actor.prototype.defaultGeneParts = function(kind) {
        const metadata = this.actor().meta['GeneDefaultParts'];
        if (metadata) {
            const allParts = metadata.split(',').map(Number);
            return CharGenerator.checkForceParts(allParts, kind);
        } else {
            return CharGenerator.defaultGeneParts();
        }
    };

    const _Game_Actor_characterName = Game_Actor.prototype.characterName;
    Game_Actor.prototype.characterName = function() {
        return this._geneKind
            ? this._geneCharacterName
            : _Game_Actor_characterName.apply(this, arguments);
    };
    
    const _Game_Actor_characterIndex = Game_Actor.prototype.characterIndex;
    Game_Actor.prototype.characterIndex = function() {
        return this._geneKind
            ? 0
            : _Game_Actor_characterIndex.apply(this, arguments);
    };
    
    const _Game_Actor_faceName = Game_Actor.prototype.faceName;
    Game_Actor.prototype.faceName = function() {
        return this._geneKind
            ? this._geneFaceName
            : _Game_Actor_faceName.apply(this, arguments);
    };
    
    const _Game_Actor_faceIndex = Game_Actor.prototype.faceIndex;
    Game_Actor.prototype.faceIndex = function() {
        return this._geneKind
            ? 0
            : _Game_Actor_faceIndex.apply(this, arguments);
    };
    
    const _Game_Actor_battlerName = Game_Actor.prototype.battlerName;
    Game_Actor.prototype.battlerName = function() {
        return this._geneKind
            ? this._geneBattlerName
            : _Game_Actor_battlerName.apply(this, arguments);
    };
    
    const _Game_Actor_refresh = Game_Actor.prototype.refresh;
    Game_Actor.prototype.refresh = function() {
        _Game_Actor_refresh.apply(this, arguments);
        this.refreshImageName();
    };

    Game_Actor.prototype.setGeneKind = function(kind) {
        if (this._geneKind !== kind) {
            if (this._geneKind && !kind) {
                this.initImages();
            }
            this._geneKind = kind;
            this.initGeneParts();
        }
    };

    Game_Actor.prototype.refreshImageName = function() {
        if (this._geneKind && !param_BaseKinds.includes(this._geneKind)) {
            console.log('存在しない基礎タイプです : ' + this._geneKind);
            this._geneKind = null;
        }
        if (this._geneKind) {
            const paramsStr = this.geneParamsString();
            const charType = this._geneCharacterDamage ? 'TVD|' : 'TV|';
            this._geneCharacterName = '$MppGene' + charType + paramsStr;
            this._geneFaceName = 'MppGeneFG|' + paramsStr;
            this._geneBattlerName =  'MppGeneSV|' + paramsStr;
            $gamePlayer.refresh();
        }
    };

    Game_Actor.prototype.geneParamsString = function() {
        const traits = this.geneTraitObjects();
        const kind = this._geneKind;
        return JSON.stringify([
            this._actorId,
            kind,
            this.applyTraitsGeneParts(this._geneParts, traits, kind),
            this.applyTraitsGeneColors(this._geneColors, traits, kind)
        ]);
    };

    Game_Actor.prototype.geneTraitObjects = function() {
        return this.equips().filter(Boolean).concat(this.currentClass());
    };

    Game_Actor.prototype.applyTraitsGeneParts = function(parts, traits, kind) {
        return parts.map((pId, i) => {
            const traitsPartsId = this.traitsMetaPartsId(i, traits, kind);
            return traitsPartsId >= 0 ? traitsPartsId : pId;
        });
    }
    
    Game_Actor.prototype.traitsMetaPartsId = function(i, traits, kind) {
        const name1 = `GeneParts ${DATABASE.icon[i]}`;
        const name2 = `${name1} ${kind}`;
        for (const { meta } of traits) {
            if (name2 in meta) return +meta[name2];
            if (name1 in meta) return +meta[name1];
        }
        return -1;
    }
    
    Game_Actor.prototype.applyTraitsGeneColors = function(colors, traits, kind) {
        const result = [...colors];
        for (let i = 0; i < 24; i++) {
            const ary = this.traitsMetaColors(i + 1, traits, kind);
            if (ary) result.splice(i * 4, ary.length, ...ary);
        }
        return result;
    };

    Game_Actor.prototype.traitsMetaColors = function(cn, traits, kind) {
        const name1 = `GeneColor ${cn}`;
        const name2 = `${name1} ${kind}`;
        for (const { meta } of traits) {
            if (name2 in meta) return meta[name2].split(',').map(Number);
            if (name1 in meta) return meta[name1].split(',').map(Number);
        }
        return null;
    };

    Game_Actor.prototype.setCharacterDamage = function(damage) {
        if (this._geneCharacterDamage !== damage) {
            this._geneCharacterDamage = damage;
            this.refreshImageName();
        }
    };

    //-------------------------------------------------------------------------
    // Game_Interpreter

    const _Game_Interpreter_clear = Game_Interpreter.prototype.clear;
    Game_Interpreter.prototype.clear = function() {
        _Game_Interpreter_clear.apply(this, arguments);
        this._charGeneDamage = false;
        this._charGeneActors = [];
    };

    const _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function() {
        let waiting = false;
        if (this._waitMode === 'GeneDamage') {
            waiting = !CharGenerator.isReady();
            if (!waiting) {
                for (const actor of this._charGeneActors) {
                    actor.setCharacterDamage(this._charGeneDamage);
                }
                this._waitMode = '';
            }
        }
        return waiting || _Game_Interpreter_updateWaitMode.apply(this, arguments);
    };

    //-----------------------------------------------------------------------------
    // Spriteset_Battle

    const _Spriteset_Battle_initialize = Spriteset_Battle.prototype.initialize;
    Spriteset_Battle.prototype.initialize = function() {
        _Spriteset_Battle_initialize.apply(this, arguments);
        this.loadActorImages();
    };
    
    Spriteset_Battle.prototype.loadActorImages = function() {
        for (const actor of $gameParty.members()) {
            const battlerName = actor.battlerName();
            if (actor.isSpriteVisible() && /^MppGeneSV/.test(battlerName)) {
                ImageManager.loadSvActor(battlerName);
            }
        }
    };
    
    //-----------------------------------------------------------------------------
    // Scene_Boot

    const _Scene_Boot_onDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function() {
        _Scene_Boot_onDatabaseLoaded.apply(this, arguments);
        this.loadGeneratorImages();
    };
    
    Scene_Boot.prototype.loadGeneratorImages = function() {
        CharGenerator.loadGradients();
    };
    
    //-------------------------------------------------------------------------
    // Scene_File

    const _Scene_File_create = Scene_File.prototype.create;
    Scene_File.prototype.create = function() {
        ImageManager.createSaveGeneratorCache();
        _Scene_File_create.apply(this, arguments);
    };

    const _Scene_File_terminate = __base(Scene_File.prototype, 'terminate');
    Scene_File.prototype.terminate = function() {
        _Scene_File_terminate.apply(this, arguments);
        ImageManager.deleteSaveGeneratorCache();
    };

})();
