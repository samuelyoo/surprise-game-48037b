(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){if(Number.isNaN(e.getTime()))throw RangeError(`Daily selection requires a valid date.`);return`${String(e.getFullYear()).padStart(4,`0`)}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}function t(e){let t=2166136261;for(let n of e)t^=n.charCodeAt(0),t=Math.imul(t,16777619)>>>0;return t}function n(n,r){if(r.length===0)throw RangeError(`Daily selection needs at least one level.`);let i=r[t(e(n))%r.length];if(!i)throw Error(`Daily level selection produced an invalid index.`);return i}var r=`g-sokoban:control-preferences:v1`;function i(e){return Object.freeze({showDirectionButtons:e.showDirectionButtons,wideSwipe:e.wideSwipe})}function a(){return i({showDirectionButtons:!0,wideSwipe:!1})}function o(e){if(typeof e!=`object`||!e||Array.isArray(e))return;let t=e,n=Object.keys(t).sort(),r=[`schema`,`showDirectionButtons`,`version`,`wideSwipe`];if(!(n.length!==r.length||n.some((e,t)=>e!==r[t])||t.schema!==`g-sokoban/control-preferences`||t.version!==1||typeof t.showDirectionButtons!=`boolean`||typeof t.wideSwipe!=`boolean`))return i({showDirectionButtons:t.showDirectionButtons,wideSwipe:t.wideSwipe})}function s(e){return Object.freeze({schema:`g-sokoban/control-preferences`,version:1,showDirectionButtons:e.showDirectionButtons,wideSwipe:e.wideSwipe})}function c(e){let t=a();if(e)try{let n=e.getItem(r);n!==null&&(t=o(JSON.parse(n))??a())}catch{t=a()}return Object.freeze({read(){return t},write(n){if(t=i(n),e)try{e.setItem(r,JSON.stringify(s(t)))}catch{}return t}})}var l=new Set([`ko`,`en`]),u=/^[a-z]{2,3}(?:-[a-z0-9]{1,8})*$/i;function d(e){return typeof e==`string`&&l.has(e)}function f(e){let t=e.trim();if(!u.test(t))return;let n=t.split(`-`,1)[0]?.toLowerCase();return d(n)?n:void 0}function p(e){if(d(e.stored))return e.stored;for(let t of e.browserLanguages??[]){let e=f(t);if(e)return e}return`en`}var m=`g-sokoban:locale:v1`;function h(e,t){let n;try{n=e?.getItem(m)}catch{n=void 0}let r=p({stored:n,browserLanguages:t});return Object.freeze({read(){return r},write(t){r=t;try{e?.setItem(m,t)}catch{}return r}})}var g=14695981039346656037n,_=1099511628211n;function v(e){let t=g,n=new TextEncoder().encode(e);for(let e of n)t^=BigInt(e),t=BigInt.asUintN(64,t*_);return t.toString(16).padStart(16,`0`)}var y=/^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/,ee=new Set([`_`,`#`,`-`,`.`]),te=20;function ne(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}function b(e){return`${e.x},${e.y}`}function x(e,t){return e.y-t.y||e.x-t.x}function S(e){return Object.freeze({x:e.x,y:e.y})}function C(e){return{x:e.x,y:e.y}}function re(e,t,n){if(!ne(e)||!Number.isInteger(e.x)||!Number.isInteger(e.y)){n.push({code:`coordinate`,path:t,message:`Coordinate must contain integer x and y values.`});return}return{x:Number(e.x),y:Number(e.y)}}function ie(e,t){if(e===void 0)return;if(!ne(e)){t.push({code:`metadata`,path:`metadata`,message:`Metadata must be an object.`});return}let n=[`title`,`subtitle`,`concept`,`author`],r={};for(let i of n){let n=e[i];n!==void 0&&typeof n!=`string`?t.push({code:`metadata_field`,path:`metadata.${i}`,message:`${i} must be a string.`}):typeof n==`string`&&(r[i]=n)}return e.provenance!==void 0&&e.provenance!==`original`&&e.provenance!==`licensed`?t.push({code:`metadata_provenance`,path:`metadata.provenance`,message:`Provenance must be original or licensed.`}):e.provenance!==void 0&&(r.provenance=e.provenance),Object.freeze(r)}function ae(e,t){if(!(t.x<0||t.y<0||t.x>=e.width||t.y>=e.height))return e.terrain[t.y]?.[t.x]}function w(e,t){let n=ae(e,t);return n===`-`||n===`.`}function T(e,t){return ae(e,t)===`.`}function oe(e){let t=[];if(!ne(e))return{ok:!1,errors:[{code:`document`,path:``,message:`Level document must be an object.`}]};e.schema!==`g-sokoban/level`&&t.push({code:`schema`,path:`schema`,message:`Unsupported level schema.`}),e.version!==1&&t.push({code:`version`,path:`version`,message:`Unsupported level version.`}),e.ruleset!==`sokoban/v1`&&t.push({code:`ruleset`,path:`ruleset`,message:`Unsupported ruleset.`}),(typeof e.id!=`string`||!y.test(e.id))&&t.push({code:`level_id`,path:`id`,message:`Level id must be a lowercase kebab-case identifier.`}),(!Number.isInteger(e.revision)||Number(e.revision)<1)&&t.push({code:`revision`,path:`revision`,message:`Revision must be a positive integer.`});let n=Number(e.width),r=Number(e.height);(!Number.isInteger(n)||n<3||n>te)&&t.push({code:`width`,path:`width`,message:`Width must be an integer from 3 to ${te}.`}),(!Number.isInteger(r)||r<3||r>te)&&t.push({code:`height`,path:`height`,message:`Height must be an integer from 3 to ${te}.`});let i=Array.isArray(e.terrain)?e.terrain:[];(!Array.isArray(e.terrain)||i.length!==r)&&t.push({code:`terrain_height`,path:`terrain`,message:`Terrain row count must match height.`});let a=0;for(let[e,r]of i.entries()){if(typeof r!=`string`){t.push({code:`terrain_row`,path:`terrain[${e}]`,message:`Terrain row must be a string.`});continue}r.length!==n&&t.push({code:`terrain_row_width`,path:`terrain[${e}]`,message:`Terrain row width must match width.`});for(let[n,i]of[...r].entries())ee.has(i)||t.push({code:`terrain_character`,path:`terrain[${e}][${n}]`,message:`Unsupported terrain character: ${i}`}),i===`.`&&(a+=1)}let o=re(e.initialPlayer,`initialPlayer`,t),s=Array.isArray(e.initialBoxes)?e.initialBoxes:[];Array.isArray(e.initialBoxes)||t.push({code:`boxes`,path:`initialBoxes`,message:`Initial boxes must be an array.`});let c=s.map((e,n)=>re(e,`initialBoxes[${n}]`,t)).filter(e=>e!==void 0),l=ie(e.metadata,t),u={schema:`g-sokoban/level`,version:1,ruleset:`sokoban/v1`,id:typeof e.id==`string`?e.id:``,revision:Number(e.revision),width:n,height:r,terrain:i.filter(e=>typeof e==`string`),initialPlayer:o??{x:-1,y:-1},initialBoxes:c,...l===void 0?{}:{metadata:l}};o&&!w(u,o)&&t.push({code:`player_terrain`,path:`initialPlayer`,message:`Player must start on floor or target.`});for(let[e,n]of c.entries())w(u,n)||t.push({code:`box_terrain`,path:`initialBoxes[${e}]`,message:`Box must start on floor or target.`});let d=c.map(b);if(new Set(d).size!==d.length&&t.push({code:`box_duplicate`,path:`initialBoxes`,message:`Box coordinates must be unique.`}),o&&d.includes(b(o))&&t.push({code:`player_box_overlap`,path:`initialPlayer`,message:`Player cannot overlap a box.`}),(c.length===0||c.length!==a)&&t.push({code:`box_target_count`,path:`initialBoxes`,message:`A level needs an equal positive number of boxes and targets.`}),t.length>0)return{ok:!1,errors:Object.freeze(t.map(e=>Object.freeze(e)))};let f=Object.freeze(c.toSorted(x).map(e=>S(e))),p=Object.freeze([...i]);return{ok:!0,value:Object.freeze({schema:`g-sokoban/level`,version:1,ruleset:`sokoban/v1`,id:e.id,revision:Number(e.revision),width:n,height:r,terrain:p,initialPlayer:S(o),initialBoxes:f,...l===void 0?{}:{metadata:l}})}}function se(e){return JSON.stringify({ruleset:e.ruleset,width:e.width,height:e.height,terrain:e.terrain,initialPlayer:C(e.initialPlayer),initialBoxes:[...e.initialBoxes].toSorted(x).map(e=>C(e))})}function E(e){return`lv1_${v(se(e))}`}var ce=new Set([`up`,`right`,`down`,`left`]),le={up:{x:0,y:-1},right:{x:1,y:0},down:{x:0,y:1},left:{x:-1,y:0}};function D(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}function O(e){if(D(e)&&Number.isInteger(e.x)&&Number.isInteger(e.y))return{x:Number(e.x),y:Number(e.y)}}function ue(e){if(!D(e)||e.kind!==`walk`&&e.kind!==`push`||!ce.has(e.direction))return;let t=O(e.playerFrom),n=O(e.playerTo);if(!t||!n)return;if(e.kind===`walk`)return Object.freeze({kind:`walk`,direction:e.direction,playerFrom:S(t),playerTo:S(n)});let r=O(e.boxFrom),i=O(e.boxTo);if(r&&i)return Object.freeze({kind:`push`,direction:e.direction,playerFrom:S(t),playerTo:S(n),boxFrom:S(r),boxTo:S(i)})}function k(e,t){return e.x===t.x&&e.y===t.y}function de(e,t){return{x:e.x+t.x,y:e.y+t.y}}function fe(e,t){let n=[...e].toSorted(x),r=[...t].toSorted(x);return n.length===r.length&&n.every((e,t)=>{let n=r[t];return n!==void 0&&k(e,n)})}function pe(e,t,n,r){let i=C(e.initialPlayer),a=[...e.initialBoxes].map(C);for(let t of r){let n=le[t.direction];if(a.every(t=>T(e,t))||!k(i,t.playerFrom)||!k(t.playerTo,de(t.playerFrom,n))||!w(e,t.playerFrom)||!w(e,t.playerTo))return!1;if(t.kind===`walk`){if(a.some(e=>k(e,t.playerTo)))return!1;i=C(t.playerTo);continue}if(!k(t.boxFrom,t.playerTo)||!k(t.boxTo,de(t.boxFrom,n))||!w(e,t.boxFrom)||!w(e,t.boxTo))return!1;let r=a.findIndex(e=>k(e,t.boxFrom));if(r<0||a.some(e=>k(e,t.boxTo)))return!1;a[r]=C(t.boxTo),i=C(t.playerTo)}return k(i,t)&&fe(a,n)}function A(e){let t=Object.freeze([...e.boxes].toSorted(x).map(e=>S(e))),n=Object.freeze(e.undoStack.map(e=>e.kind===`walk`?Object.freeze({kind:`walk`,direction:e.direction,playerFrom:S(e.playerFrom),playerTo:S(e.playerTo)}):Object.freeze({kind:`push`,direction:e.direction,playerFrom:S(e.playerFrom),playerTo:S(e.playerTo),boxFrom:S(e.boxFrom),boxTo:S(e.boxTo)})));return Object.freeze({schema:`g-sokoban/state`,version:1,ruleset:`sokoban/v1`,levelFingerprint:e.levelFingerprint,player:S(e.player),boxes:t,moves:e.moves,pushes:e.pushes,undoStack:n})}function me(e){return A({schema:`g-sokoban/state`,version:1,ruleset:`sokoban/v1`,levelFingerprint:E(e),player:e.initialPlayer,boxes:e.initialBoxes,moves:0,pushes:0,undoStack:[]})}function he(e){return e.kind===`walk`?{kind:e.kind,direction:e.direction,playerFrom:C(e.playerFrom),playerTo:C(e.playerTo)}:{kind:e.kind,direction:e.direction,playerFrom:C(e.playerFrom),playerTo:C(e.playerTo),boxFrom:C(e.boxFrom),boxTo:C(e.boxTo)}}function ge(e){return JSON.stringify({ruleset:e.ruleset,levelFingerprint:e.levelFingerprint,player:C(e.player),boxes:[...e.boxes].toSorted(x).map(e=>C(e)),moves:e.moves,pushes:e.pushes,undoStack:e.undoStack.map(he)})}function _e(e){return`st1_${v(ge(e))}`}function ve(e){return JSON.parse(JSON.stringify(e))}function ye(e,t){let n=[];if(!D(t))return{ok:!1,errors:[{code:`document`,path:``,message:`State must be an object.`}]};t.schema!==`g-sokoban/state`&&n.push({code:`schema`,path:`schema`,message:`Unsupported state schema.`}),t.version!==1&&n.push({code:`version`,path:`version`,message:`Unsupported state version.`}),t.ruleset!==`sokoban/v1`&&n.push({code:`ruleset`,path:`ruleset`,message:`Unsupported state ruleset.`}),t.levelFingerprint!==E(e)&&n.push({code:`level_fingerprint`,path:`levelFingerprint`,message:`State belongs to a different level.`});let r=O(t.player);(!r||!w(e,r))&&n.push({code:`player`,path:`player`,message:`State player must occupy traversable terrain.`});let i=(Array.isArray(t.boxes)?t.boxes:[]).map(O).filter(e=>e!==void 0);(!Array.isArray(t.boxes)||i.length!==t.boxes.length||i.length!==e.initialBoxes.length||i.some(t=>!w(e,t))||new Set(i.map(b)).size!==i.length)&&n.push({code:`boxes`,path:`boxes`,message:`State boxes must preserve count and occupy unique traversable cells.`}),r&&i.some(e=>b(e)===b(r))&&n.push({code:`player_box_overlap`,path:`player`,message:`State player cannot overlap a box.`});let a=Array.isArray(t.undoStack)?t.undoStack:[],o=a.map(ue).filter(e=>e!==void 0);(!Array.isArray(t.undoStack)||o.length!==a.length)&&n.push({code:`undo_stack`,path:`undoStack`,message:`Undo stack contains an invalid move record.`});let s=t.moves,c=t.pushes;(typeof s!=`number`||!Number.isInteger(s)||s<0||s!==o.length)&&n.push({code:`moves`,path:`moves`,message:`Move count must equal undo history length.`});let l=o.filter(e=>e.kind===`push`).length;return(typeof c!=`number`||!Number.isInteger(c)||c<0||c!==l)&&n.push({code:`pushes`,path:`pushes`,message:`Push count must equal push records in undo history.`}),r&&i.length===e.initialBoxes.length&&o.length===a.length&&!pe(e,r,i,o)&&n.push({code:`undo_history`,path:`undoStack`,message:`Undo history does not produce the encoded final state.`}),n.length>0||!r||typeof s!=`number`||typeof c!=`number`?{ok:!1,errors:Object.freeze(n.map(e=>Object.freeze(e)))}:{ok:!0,value:A({schema:`g-sokoban/state`,version:1,ruleset:`sokoban/v1`,levelFingerprint:E(e),player:r,boxes:i,moves:s,pushes:c,undoStack:o})}}var be=`g-sokoban:save:v1`,xe=`g-sokoban:save:v2`,Se=new Set([`up`,`right`,`down`,`left`]);function j(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}function M(e){return typeof e==`number`&&Number.isInteger(e)&&e>=0}function N(e,t){let n=new Set(t);return Object.keys(e).every(e=>n.has(e))}function P(e){return j(e)&&N(e,[`x`,`y`])&&Number.isInteger(e.x)&&Number.isInteger(e.y)}function F(e){return!j(e)||!Se.has(e.direction)||!P(e.playerFrom)||!P(e.playerTo)?!1:e.kind===`walk`?N(e,[`kind`,`direction`,`playerFrom`,`playerTo`]):e.kind===`push`&&N(e,[`kind`,`direction`,`playerFrom`,`playerTo`,`boxFrom`,`boxTo`])&&P(e.boxFrom)&&P(e.boxTo)}function Ce(){return{schema:`g-sokoban/save`,version:1,campaign:{highestUnlocked:1,completedLevelIds:[]},current:null,best:{},bestByBoard:{},settings:{sound:!1,haptics:!1,reducedMotion:!1},analytics:{schema:`g-sokoban/aggregate-events`,version:1,counts:{}}}}function I(e){return JSON.parse(JSON.stringify(e))}function L(e){if(!j(e))return;let t=[];for(let[n,r]of Object.entries(e)){if(!j(r)||!M(r.moves)||!M(r.pushes)||r.levelFingerprint!==void 0&&typeof r.levelFingerprint!=`string`)return;t.push([n,{moves:r.moves,pushes:r.pushes,...typeof r.levelFingerprint==`string`?{levelFingerprint:r.levelFingerprint}:{}}])}return Object.fromEntries(t)}function we(e){if(e===void 0)return{};if(!j(e))return;let t=Object.entries(e).map(([e,t])=>[e,L(t)]);return t.some(([,e])=>e===void 0)?void 0:Object.fromEntries(t)}function Te(e){if(!j(e))return;let t=new Set([`level_started`,`level_completed`,`undo_used`,`restart_used`,`share_requested`]),n={};for(let[r,i]of Object.entries(e)){if(!t.has(r)||!M(i))return;n[r]=i}return n}function Ee(e){return j(e)&&N(e,[`schema`,`version`,`ruleset`,`levelFingerprint`,`player`,`boxes`,`moves`,`pushes`,`undoStack`])&&e.schema===`g-sokoban/state`&&e.version===1&&e.ruleset===`sokoban/v1`&&typeof e.levelFingerprint==`string`&&P(e.player)&&Array.isArray(e.boxes)&&e.boxes.every(P)&&M(e.moves)&&M(e.pushes)&&Array.isArray(e.undoStack)&&e.undoStack.every(F)}function De(e){if(!j(e)||e.schema!==`g-sokoban/save`||e.version!==1||!j(e.campaign)||!M(e.campaign.highestUnlocked)||!Array.isArray(e.campaign.completedLevelIds)||!e.campaign.completedLevelIds.every(e=>typeof e==`string`)||!j(e.settings)||typeof e.settings.sound!=`boolean`||typeof e.settings.haptics!=`boolean`||typeof e.settings.reducedMotion!=`boolean`||!j(e.analytics)||e.analytics.schema!==`g-sokoban/aggregate-events`||e.analytics.version!==1)return;let t=L(e.best),n=we(e.bestByBoard),r=Te(e.analytics.counts);if(!t||!n||!r)return;let i=null;if(e.current!==null){if(!j(e.current)||typeof e.current.levelId!=`string`||e.current.mode!==void 0&&e.current.mode!==`campaign`&&e.current.mode!==`daily`||!Ee(e.current.state))return;i={levelId:e.current.levelId,mode:e.current.mode??`campaign`,state:e.current.state}}return{schema:`g-sokoban/save`,version:1,campaign:{highestUnlocked:e.campaign.highestUnlocked,completedLevelIds:[...e.campaign.completedLevelIds]},current:i,best:t,bestByBoard:n,settings:{sound:e.settings.sound,haptics:e.settings.haptics,reducedMotion:e.settings.reducedMotion},analytics:{schema:`g-sokoban/aggregate-events`,version:1,counts:r}}}function Oe(e){try{return De(JSON.parse(e))}catch{return}}function R(e,t){let n=new Map,r=new Map,i=(e,t,n)=>{let i=r.get(e)??new Map;z(n,i.get(t))&&i.set(t,{moves:n.moves,pushes:n.pushes}),r.set(e,i)};for(let r of[e,t]){for(let[e,t]of Object.entries(r.bestByBoard))for(let[n,r]of Object.entries(t))i(e,n,r);for(let[e,t]of Object.entries(r.best)){t.levelFingerprint&&i(e,t.levelFingerprint,t);let r=n.get(e);(!r||(r.levelFingerprint===t.levelFingerprint?z(t,r):t.levelFingerprint===void 0||r.levelFingerprint!==void 0))&&n.set(e,t)}}return{...t,campaign:{highestUnlocked:Math.max(e.campaign.highestUnlocked,t.campaign.highestUnlocked),completedLevelIds:[...new Set([...e.campaign.completedLevelIds,...t.campaign.completedLevelIds])].toSorted()},best:Object.fromEntries(n),bestByBoard:Object.fromEntries([...r].map(([e,t])=>[e,Object.fromEntries(t)]))}}function ke(e,t={}){let n=e=>Ae(e,t),r=Ce(),i=!1,a=!1,o=!1,s=!0,c=()=>{if(e&&!i)try{let t=e.getItem(xe);if(t===null)return null;let r=Oe(t);if(!r){i=!0;return}return s=!1,n(r)}catch{return}},l=()=>{if(!s)return!0;if(!e)return!1;try{let t=e.getItem(be),i=n(t?Oe(t)??Ce():Ce());return r=a?{...R(i,r),analytics:o?r.analytics:i.analytics}:R(r,i),s=!1,!0}catch{return!1}},u=()=>{if(a=!0,e&&!i)try{e.setItem(xe,JSON.stringify(r)),a=!1,o=!1}catch{}},d=c();d?r=d:d===null&&l()&&u();let f=()=>{let e=c();if(e)r=a?{...R(e,r),analytics:o?r.analytics:e.analytics}:R(r,e);else if(e===null&&!l())return!1;return e!==void 0},p=e=>JSON.stringify(e.analytics)!==JSON.stringify(r.analytics),m=(e,t,i)=>{let s=n(e);r=I(R(r,{...s,analytics:i?s.analytics:r.analytics})),o||=i,t?u():a=!0};return Object.freeze({read:()=>I(r),write(e,t){let n=f();m(e,n,t?.replaceAnalytics===!0)},update(e){let t=f(),n=e(I(r));return m(n,t,p(n)),I(r)}})}function z(e,t){return t===void 0||e.pushes<t.pushes||e.pushes===t.pushes&&e.moves<t.moves}function Ae(e,t){let n={...e.best},r={...e.bestByBoard};for(let[e,i]of Object.entries(n)){let a=i.levelFingerprint??(Object.hasOwn(t,e)?t[e]:void 0);if(!a)continue;let o={...r[e]};z(i,o[a])&&(o[a]={moves:i.moves,pushes:i.pushes}),r[e]=o,n[e]={...i,levelFingerprint:a}}return{...e,best:n,bestByBoard:r}}function je(e,t,n){let r=Object.hasOwn(e.bestByBoard,t)?e.bestByBoard[t]:void 0,i=r&&Object.hasOwn(r,n)?r[n]:void 0,a=Object.hasOwn(e.best,t)?e.best[t]:void 0,o=i??(a?.levelFingerprint===n?a:void 0);return o?{moves:o.moves,pushes:o.pushes}:void 0}function Me(e,t){if(!Number.isInteger(t.campaignPosition)||!Number.isInteger(t.campaignLength)||t.campaignPosition<1||t.campaignLength<1||t.campaignPosition>t.campaignLength)throw RangeError(`Campaign position must be within the campaign length.`);let n=new Set(e.campaign.completedLevelIds),r={...e.best},i={...e.bestByBoard};if(t.won){n.add(t.levelId);let a={moves:t.state.moves,pushes:t.state.pushes},o=t.state.levelFingerprint,s={...i[t.levelId]};z(a,je(e,t.levelId,o))&&(s[o]=a,i[t.levelId]=s,(!r[t.levelId]||r[t.levelId]?.levelFingerprint)&&(r[t.levelId]={...a,levelFingerprint:o}))}return{...e,campaign:{highestUnlocked:t.won&&t.mode!==`daily`?Math.min(t.campaignLength,Math.max(e.campaign.highestUnlocked,t.campaignPosition+1)):e.campaign.highestUnlocked,completedLevelIds:[...n].toSorted()},current:{levelId:t.levelId,mode:t.mode??`campaign`,state:ve(t.state)},best:r,bestByBoard:i}}function Ne(e,t=()=>new Date){let n=new Set,r=(r,i)=>{n.has(r)||(n.add(r),e.record(r,i,t()))};return{start(e){r(`session_started`,e)},recordGameStarted(e){r(`game_started`,e)},captureError(e,t){r(`session_error`,e)},recordCompletion(n,r,i){e.record(`level_completed`,n,t()),i===`campaign`&&r===1&&!e.hasEvent(`tutorial_completed`)&&e.record(`tutorial_completed`,n,t()),i===`campaign`&&r===2&&!e.hasEvent(`first_puzzle_completed`)&&e.record(`first_puzzle_completed`,n,t())},recordUndo(n){e.record(`undo_used`,n,t())},recordRestart(n){e.record(`restart_used`,n,t())},recordShareSucceeded(n){e.record(`share_succeeded`,n,t())},recordFeedbackPrepared(n){e.record(`feedback_prepared`,n,t())}}}var Pe=Object.freeze([`session_started`,`game_started`,`tutorial_completed`,`first_puzzle_completed`,`level_completed`,`undo_used`,`restart_used`,`share_succeeded`,`session_error`,`feedback_prepared`]),Fe=Object.freeze([`aggregateValue`,`eventName`,`levelId`,`localTimestamp`]),Ie=/^[a-z0-9]+(?:-[a-z0-9]+)*$/,Le=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})$/;function Re(e){return typeof e==`string`&&Pe.some(t=>t===e)}function ze(e){return typeof e==`string`&&e.length<=96&&Ie.test(e)}function Be(e){if(typeof e!=`string`)return!1;let t=Le.exec(e);if(!t)return!1;let[,n,r,i,a,o,s,c]=t,l=[n,r,i,a,o,s,c].map(Number);if(l.some(e=>!Number.isInteger(e)))return!1;let[u,d,f,p,m,h,g]=l,_=new Date(u,d-1,f,p,m,h,g);return _.getFullYear()===u&&_.getMonth()===d-1&&_.getDate()===f&&_.getHours()===p&&_.getMinutes()===m&&_.getSeconds()===h&&_.getMilliseconds()===g}function B(e,t=2){return String(e).padStart(t,`0`)}function Ve(e){if(!Number.isFinite(e.getTime()))throw Error(`Local metric timestamp is invalid`);return`${B(e.getFullYear(),4)}-${B(e.getMonth()+1)}-${B(e.getDate())}T${B(e.getHours())}:${B(e.getMinutes())}:${B(e.getSeconds())}.${B(e.getMilliseconds(),3)}`}function He(e){if(!e||typeof e!=`object`||Array.isArray(e))throw Error(`Local metric record is invalid`);let t=e,n=Object.keys(t).toSorted();if(n.length!==Fe.length||n.some((e,t)=>e!==Fe[t])||!Re(t.eventName)||!ze(t.levelId)||!Number.isSafeInteger(t.aggregateValue)||t.aggregateValue<=0||!Be(t.localTimestamp))throw Error(`Local metric record is invalid`);return Object.freeze({eventName:t.eventName,levelId:t.levelId,aggregateValue:t.aggregateValue,localTimestamp:t.localTimestamp})}var Ue=`g-sokoban:local-metrics:v1`,We=30;function Ge(){return{schema:`g-sokoban/local-metrics`,version:1,records:[]}}function Ke(e){if(e===null)return Ge();let t=JSON.parse(e);if(!t||typeof t!=`object`||Array.isArray(t))throw Error(`Local metric document is invalid`);let n=t;if(n.schema!==`g-sokoban/local-metrics`||n.version!==1||!Array.isArray(n.records)||Object.keys(n).toSorted().join(`,`)!==`records,schema,version`)throw Error(`Local metric document is invalid`);return{schema:`g-sokoban/local-metrics`,version:1,records:n.records.map(He)}}function qe(e){let[t,n,r]=e.slice(0,10).split(`-`).map(Number);return Math.floor(Date.UTC(t,n-1,r)/864e5)}function Je(e,t){let n=qe(Ve(t));return e.filter(e=>{let t=n-qe(e.localTimestamp);return t>=0&&t<We}).toSorted((e,t)=>{let n=`${e.localTimestamp}|${e.eventName}|${e.levelId}`,r=`${t.localTimestamp}|${t.eventName}|${t.levelId}`;return n<r?-1:+(n>r)}).slice(-512)}function Ye(e,t={}){let n=t.now??(()=>new Date),r;try{r=Ke(e?.getItem(`g-sokoban:local-metrics:v1`)??null)}catch{r=Ge()}let i=()=>{try{e?.setItem(Ue,JSON.stringify(r))}catch{}},a=()=>{r={...r,records:Je(r.records,n())}};return{read(){return a(),{...r,records:r.records.map(e=>({...e}))}},record(e,t,a=n()){let o=Ve(a),s=He({eventName:e,levelId:t,aggregateValue:1,localTimestamp:o}),c=o.slice(0,10),l=r.records.findIndex(n=>n.eventName===e&&n.levelId===t&&n.localTimestamp.startsWith(c)),u=r.records.map(e=>({...e}));if(l>=0){let e=u[l];e&&(u[l]={...e,aggregateValue:Math.min(2**53-1,e.aggregateValue+1),localTimestamp:e.localTimestamp>s.localTimestamp?e.localTimestamp:s.localTimestamp})}else u.push(s);r={...r,records:Je(u,n())},i()},hasEvent(e){return a(),r.records.some(t=>t.eventName===e)},clear(){r=Ge();try{e?.removeItem(Ue)}catch{}}}}var Xe=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-01-first-light",
  "revision": 1,
  "width": 6,
  "height": 7,
  "terrain": [
    "######",
    "#----#",
    "#----#",
    "#----#",
    "#---.#",
    "#----#",
    "######"
  ],
  "initialPlayer": {
    "x": 4,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 3
    }
  ],
  "metadata": {
    "title": "First Light",
    "concept": "push toward a visible goal",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Ze=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-02-step-around",
  "revision": 1,
  "width": 6,
  "height": 7,
  "terrain": [
    "######",
    "#----#",
    "#.---#",
    "#----#",
    "#----#",
    "#----#",
    "######"
  ],
  "initialPlayer": {
    "x": 2,
    "y": 4
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 3
    }
  ],
  "metadata": {
    "title": "Step Around",
    "concept": "walk behind a box",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Qe=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-03-turning-lane",
  "revision": 1,
  "width": 6,
  "height": 7,
  "terrain": [
    "######",
    "#----#",
    "#----#",
    "#----#",
    "#----#",
    "#.---#",
    "######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 3
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 3
    }
  ],
  "metadata": {
    "title": "Turning Lane",
    "concept": "change push direction",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,$e=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-04-entry-test",
  "revision": 1,
  "width": 5,
  "height": 6,
  "terrain": [
    "#####",
    "#---#",
    "#---#",
    "#---#",
    "#.--#",
    "#####"
  ],
  "initialPlayer": {
    "x": 2,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    }
  ],
  "metadata": {
    "title": "Entry Test",
    "concept": "choose the goal entry side",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,et=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-05-clear-sky",
  "revision": 1,
  "width": 7,
  "height": 5,
  "terrain": [
    "#######",
    "#.----#",
    "#-#---#",
    "#-----#",
    "#######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 3
  },
  "initialBoxes": [
    {
      "x": 1,
      "y": 2
    }
  ],
  "metadata": {
    "title": "Clear Sky",
    "concept": "one-box recovery",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,tt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-06-corner-warning",
  "revision": 1,
  "width": 6,
  "height": 7,
  "terrain": [
    "######",
    "#.---#",
    "#-#--#",
    "#-#--#",
    "#----#",
    "#----#",
    "######"
  ],
  "initialPlayer": {
    "x": 3,
    "y": 3
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 2
    }
  ],
  "metadata": {
    "title": "Corner Warning",
    "concept": "recognize unsafe corners",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,nt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-07-back-route",
  "revision": 1,
  "width": 6,
  "height": 7,
  "terrain": [
    "######",
    "#----#",
    "#-##-#",
    "#----#",
    "#---.#",
    "#----#",
    "######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 4
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Back Route",
    "concept": "route behind the box",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,rt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-08-safe-approach",
  "revision": 1,
  "width": 6,
  "height": 7,
  "terrain": [
    "######",
    "#----#",
    "#----#",
    "#----#",
    "#.##-#",
    "#----#",
    "######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    }
  ],
  "metadata": {
    "title": "Safe Approach",
    "concept": "combine corner safety and approach",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,it=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-09-wall-orbit",
  "revision": 1,
  "width": 8,
  "height": 6,
  "terrain": [
    "########",
    "#------#",
    "#----#-#",
    "#.#-##-#",
    "#------#",
    "########"
  ],
  "initialPlayer": {
    "x": 4,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 2
    }
  ],
  "metadata": {
    "title": "Wall Orbit",
    "concept": "navigate around internal walls",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,at=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-10-soft-landing",
  "revision": 1,
  "width": 6,
  "height": 7,
  "terrain": [
    "######",
    "#----#",
    "#.##-#",
    "#----#",
    "#----#",
    "#----#",
    "######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 5
  },
  "initialBoxes": [
    {
      "x": 1,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Soft Landing",
    "concept": "safe-route recovery",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,ot=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-100-congestion-recover",
  "revision": 4,
  "width": 7,
  "height": 8,
  "terrain": [
    "#######",
    "#-.---#",
    "#----.#",
    "#-----#",
    "#-...-#",
    "#--####",
    "#--#___",
    "####___"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 5
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 1
    },
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Cloud Junction 100",
    "concept": "congestion recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,st=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-101-congestion-teach",
  "revision": 4,
  "width": 7,
  "height": 7,
  "terrain": [
    "######_",
    "#----##",
    "#.----#",
    "#.----#",
    "#----##",
    "#..-.#_",
    "######_"
  ],
  "initialPlayer": {
    "x": 5,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 4,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Cloud Junction 101",
    "concept": "introduce congestion",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,V=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-102-congestion-practice",
  "revision": 4,
  "width": 7,
  "height": 7,
  "terrain": [
    "#######",
    "#..-.-#",
    "#.----#",
    "#.---##",
    "#----#_",
    "#----#_",
    "######_"
  ],
  "initialPlayer": {
    "x": 5,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 1
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 3,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Cloud Junction 102",
    "concept": "practice congestion",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,ct=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-103-congestion-combine",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "__####",
    "###--#",
    "#.---#",
    "#----#",
    "#.---#",
    "#----#",
    "#....#",
    "######"
  ],
  "initialPlayer": {
    "x": 3,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 1,
      "y": 3
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 2,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Cloud Junction 103",
    "concept": "combine congestion",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,lt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-104-congestion-test",
  "revision": 3,
  "width": 9,
  "height": 6,
  "terrain": [
    "#######__",
    "#--...#__",
    "#-----###",
    "#-------#",
    "#-...---#",
    "#########"
  ],
  "initialPlayer": {
    "x": 7,
    "y": 3
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 6,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 6,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Cloud Junction 104",
    "concept": "test congestion",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,ut=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-105-congestion-recover",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "_####_",
    "##--##",
    "#.---#",
    "#.---#",
    "#.---#",
    "#.---#",
    "#-.--#",
    "######"
  ],
  "initialPlayer": {
    "x": 2,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 3,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Cloud Junction 105",
    "concept": "congestion recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,H=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-106-congestion-teach",
  "revision": 4,
  "width": 7,
  "height": 7,
  "terrain": [
    "#######",
    "#--.--#",
    "#-----#",
    "#---.##",
    "#---.#_",
    "#--..#_",
    "######_"
  ],
  "initialPlayer": {
    "x": 5,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 1
    },
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    }
  ],
  "metadata": {
    "title": "Cloud Junction 106",
    "concept": "introduce congestion",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,dt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-107-congestion-practice",
  "revision": 5,
  "width": 6,
  "height": 8,
  "terrain": [
    "_####_",
    "_#--#_",
    "##--##",
    "#.---#",
    "#.---#",
    "#.---#",
    "#..--#",
    "######"
  ],
  "initialPlayer": {
    "x": 2,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 3,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Cloud Junction 107",
    "concept": "practice congestion",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,ft=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-108-congestion-combine",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "######",
    "#.-..#",
    "#----#",
    "#.---#",
    "#---.#",
    "#--.-#",
    "#--###",
    "####__"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 6
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 1
    },
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 1,
      "y": 5
    },
    {
      "x": 2,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Cloud Junction 108",
    "concept": "combine congestion",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,pt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-109-congestion-test",
  "revision": 3,
  "width": 6,
  "height": 8,
  "terrain": [
    "####__",
    "#--###",
    "#--..#",
    "#---.#",
    "#.---#",
    "#.---#",
    "#.---#",
    "######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 1,
      "y": 2
    },
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 1,
      "y": 4
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 4,
      "y": 4
    },
    {
      "x": 2,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Cloud Junction 109",
    "concept": "test congestion",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,mt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-11-two-stars",
  "revision": 1,
  "width": 8,
  "height": 7,
  "terrain": [
    "########",
    "#--.---#",
    "#--##--#",
    "#--#---#",
    "#------#",
    "#.-----#",
    "########"
  ],
  "initialPlayer": {
    "x": 5,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 1
    },
    {
      "x": 2,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Two Stars",
    "concept": "introduce two boxes",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,ht=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-110-congestion-recover",
  "revision": 4,
  "width": 7,
  "height": 8,
  "terrain": [
    "#######",
    "#.----#",
    "#.----#",
    "#-----#",
    "#.-..-#",
    "####--#",
    "___#--#",
    "___####"
  ],
  "initialPlayer": {
    "x": 4,
    "y": 5
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 1
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 3,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Cloud Junction 110",
    "concept": "congestion recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,gt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-111-congestion-teach",
  "revision": 4,
  "width": 7,
  "height": 7,
  "terrain": [
    "#######",
    "#-.-.-#",
    "#----.#",
    "##---.#",
    "_#----#",
    "_#---.#",
    "_######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 1
    },
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    }
  ],
  "metadata": {
    "title": "Cloud Junction 111",
    "concept": "introduce congestion",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,_t=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-112-congestion-practice",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "######",
    "#-...#",
    "#---.#",
    "#----#",
    "#---.#",
    "#----#",
    "##--##",
    "_####_"
  ],
  "initialPlayer": {
    "x": 2,
    "y": 6
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 2,
      "y": 5
    },
    {
      "x": 3,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Cloud Junction 112",
    "concept": "practice congestion",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,vt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-113-congestion-combine",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "######",
    "#....#",
    "#---.#",
    "#---.#",
    "#----#",
    "#----#",
    "##--##",
    "_####_"
  ],
  "initialPlayer": {
    "x": 2,
    "y": 6
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 2,
      "y": 5
    },
    {
      "x": 3,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Cloud Junction 113",
    "concept": "combine congestion",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,yt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-114-congestion-test",
  "revision": 3,
  "width": 9,
  "height": 6,
  "terrain": [
    "#########",
    "#-.-.---#",
    "#.---.--#",
    "#.----###",
    "#---.-#__",
    "#######__"
  ],
  "initialPlayer": {
    "x": 7,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 6,
      "y": 1
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 5,
      "y": 2
    },
    {
      "x": 6,
      "y": 2
    },
    {
      "x": 4,
      "y": 3
    }
  ],
  "metadata": {
    "title": "Cloud Junction 114",
    "concept": "test congestion",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,bt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-115-congestion-recover",
  "revision": 4,
  "width": 7,
  "height": 7,
  "terrain": [
    "_######",
    "_#....#",
    "_#----#",
    "##----#",
    "#-.---#",
    "#-----#",
    "#######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 4
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 4,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Cloud Junction 115",
    "concept": "congestion recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,xt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-116-congestion-teach",
  "revision": 4,
  "width": 7,
  "height": 7,
  "terrain": [
    "######_",
    "#-.--##",
    "#.----#",
    "#.----#",
    "#----##",
    "#.-.-#_",
    "######_"
  ],
  "initialPlayer": {
    "x": 5,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 2,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Cloud Junction 116",
    "concept": "introduce congestion",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,St=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-117-congestion-practice",
  "revision": 4,
  "width": 7,
  "height": 7,
  "terrain": [
    "_######",
    "##...-#",
    "#-.--.#",
    "#-----#",
    "##----#",
    "_#----#",
    "_######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 4,
      "y": 4
    },
    {
      "x": 5,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Cloud Junction 117",
    "concept": "practice congestion",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Ct=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-118-congestion-combine",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "######",
    "#....#",
    "#----#",
    "#----#",
    "#.--.#",
    "#----#",
    "###--#",
    "__####"
  ],
  "initialPlayer": {
    "x": 3,
    "y": 6
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 3,
      "y": 5
    },
    {
      "x": 4,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Cloud Junction 118",
    "concept": "combine congestion",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,wt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-119-congestion-test",
  "revision": 3,
  "width": 8,
  "height": 6,
  "terrain": [
    "########",
    "#----..#",
    "#-----.#",
    "###---.#",
    "__#--..#",
    "__######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 1
    },
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 5,
      "y": 2
    },
    {
      "x": 5,
      "y": 3
    }
  ],
  "metadata": {
    "title": "Cloud Junction 119",
    "concept": "test congestion",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Tt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-12-shift-change",
  "revision": 1,
  "width": 8,
  "height": 7,
  "terrain": [
    "########",
    "#--.---#",
    "#-.----#",
    "#-##-#-#",
    "#---#--#",
    "#------#",
    "########"
  ],
  "initialPlayer": {
    "x": 3,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 1
    },
    {
      "x": 4,
      "y": 2
    }
  ],
  "metadata": {
    "title": "Shift Change",
    "concept": "switch between boxes",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Et=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-120-congestion-recover",
  "revision": 4,
  "width": 7,
  "height": 8,
  "terrain": [
    "_####__",
    "_#--#__",
    "##--###",
    "#-....#",
    "#-----#",
    "#.----#",
    "#-----#",
    "#######"
  ],
  "initialPlayer": {
    "x": 2,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 5,
      "y": 4
    },
    {
      "x": 4,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Cloud Junction 120",
    "concept": "congestion recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Dt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-121-counterintuitive-routing-teach",
  "revision": 4,
  "width": 7,
  "height": 7,
  "terrain": [
    "_######",
    "_#..-.#",
    "##.--.#",
    "#-.---#",
    "#-----#",
    "##----#",
    "_######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 3
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 1
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 4,
      "y": 4
    },
    {
      "x": 5,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Far Orbit 121",
    "concept": "introduce counterintuitive-routing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Ot=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-122-counterintuitive-routing-practice",
  "revision": 4,
  "width": 7,
  "height": 8,
  "terrain": [
    "#######",
    "#-..-.#",
    "#----.#",
    "#-----#",
    "#--.-.#",
    "##--###",
    "_#--#__",
    "_####__"
  ],
  "initialPlayer": {
    "x": 2,
    "y": 6
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 1
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 2,
      "y": 5
    },
    {
      "x": 3,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Far Orbit 122",
    "concept": "practice counterintuitive-routing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,kt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-123-counterintuitive-routing-combine",
  "revision": 4,
  "width": 8,
  "height": 6,
  "terrain": [
    "__######",
    "###....#",
    "#-----.#",
    "#------#",
    "###.---#",
    "__######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 1
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 5,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 5,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Far Orbit 123",
    "concept": "combine counterintuitive-routing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,At=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-124-counterintuitive-routing-test",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "######",
    "#---.#",
    "#---.#",
    "#---.#",
    "#.-..#",
    "##--##",
    "_#--#_",
    "_####_"
  ],
  "initialPlayer": {
    "x": 2,
    "y": 5
  },
  "initialBoxes": [
    {
      "x": 1,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 3,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Far Orbit 124",
    "concept": "test counterintuitive-routing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,jt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-125-counterintuitive-routing-recover",
  "revision": 4,
  "width": 7,
  "height": 7,
  "terrain": [
    "_######",
    "_#.---#",
    "_#.---#",
    "##.---#",
    "#-.---#",
    "#----.#",
    "#######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 4
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 4,
      "y": 4
    },
    {
      "x": 2,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Far Orbit 125",
    "concept": "counterintuitive-routing recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Mt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-126-counterintuitive-routing-teach",
  "revision": 4,
  "width": 9,
  "height": 6,
  "terrain": [
    "__#######",
    "###...--#",
    "#--.----#",
    "#--.---.#",
    "###-----#",
    "__#######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 7,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 6,
      "y": 3
    }
  ],
  "metadata": {
    "title": "Far Orbit 126",
    "concept": "introduce counterintuitive-routing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Nt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-127-counterintuitive-routing-practice",
  "revision": 4,
  "width": 7,
  "height": 7,
  "terrain": [
    "######_",
    "#.--.#_",
    "#.---##",
    "#---.-#",
    "#-----#",
    "#.-.-##",
    "######_"
  ],
  "initialPlayer": {
    "x": 5,
    "y": 3
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 4,
      "y": 4
    },
    {
      "x": 2,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Far Orbit 127",
    "concept": "practice counterintuitive-routing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Pt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-128-counterintuitive-routing-combine",
  "revision": 4,
  "width": 8,
  "height": 6,
  "terrain": [
    "########",
    "#--.-..#",
    "#------#",
    "###---.#",
    "__#.--.#",
    "__######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 1
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 6,
      "y": 2
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 4,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Far Orbit 128",
    "concept": "combine counterintuitive-routing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Ft=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-129-counterintuitive-routing-test",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "__####",
    "__#--#",
    "###--#",
    "#..-.#",
    "#----#",
    "#---.#",
    "#-..-#",
    "######"
  ],
  "initialPlayer": {
    "x": 3,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 2,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Far Orbit 129",
    "concept": "test counterintuitive-routing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,It=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-13-order-lanes",
  "revision": 1,
  "width": 7,
  "height": 8,
  "terrain": [
    "#######",
    "#-----#",
    "#--#--#",
    "#--#--#",
    "#-#-#-#",
    "#-#--.#",
    "#---.-#",
    "#######"
  ],
  "initialPlayer": {
    "x": 3,
    "y": 4
  },
  "initialBoxes": [
    {
      "x": 5,
      "y": 2
    },
    {
      "x": 3,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Order Lanes",
    "concept": "combine routing and box order",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Lt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-130-counterintuitive-routing-recover",
  "revision": 4,
  "width": 7,
  "height": 7,
  "terrain": [
    "_######",
    "##---.#",
    "#-----#",
    "#----.#",
    "##---.#",
    "_#.-.-#",
    "_######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Far Orbit 130",
    "concept": "counterintuitive-routing recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Rt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-131-counterintuitive-routing-teach",
  "revision": 3,
  "width": 6,
  "height": 8,
  "terrain": [
    "######",
    "#----#",
    "#.---#",
    "#.---#",
    "#.--.#",
    "#.--.#",
    "###--#",
    "__####"
  ],
  "initialPlayer": {
    "x": 3,
    "y": 6
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 3,
      "y": 5
    },
    {
      "x": 4,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Far Orbit 131",
    "concept": "introduce counterintuitive-routing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,zt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-132-counterintuitive-routing-practice",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "######",
    "#----#",
    "#.---#",
    "#---.#",
    "#---.#",
    "#-...#",
    "#--###",
    "####__"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 6
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 1,
      "y": 5
    },
    {
      "x": 2,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Far Orbit 132",
    "concept": "practice counterintuitive-routing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Bt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-133-counterintuitive-routing-combine",
  "revision": 4,
  "width": 8,
  "height": 6,
  "terrain": [
    "########",
    "#-----.#",
    "#-----.#",
    "###.---#",
    "__#..-.#",
    "__######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 1
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 5,
      "y": 2
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 6,
      "y": 3
    }
  ],
  "metadata": {
    "title": "Far Orbit 133",
    "concept": "combine counterintuitive-routing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Vt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-134-counterintuitive-routing-test",
  "revision": 3,
  "width": 6,
  "height": 8,
  "terrain": [
    "_####_",
    "_#--#_",
    "##--##",
    "#....#",
    "#----#",
    "#.---#",
    "#.---#",
    "######"
  ],
  "initialPlayer": {
    "x": 2,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 1,
      "y": 4
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 2,
      "y": 5
    },
    {
      "x": 2,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Far Orbit 134",
    "concept": "test counterintuitive-routing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Ht=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-135-counterintuitive-routing-recover",
  "revision": 4,
  "width": 7,
  "height": 8,
  "terrain": [
    "####___",
    "#--#___",
    "#--####",
    "#.--.-#",
    "#-----#",
    "#.----#",
    "#-..--#",
    "#######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 1,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 3,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Far Orbit 135",
    "concept": "counterintuitive-routing recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Ut=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-136-counterintuitive-routing-teach",
  "revision": 3,
  "width": 9,
  "height": 6,
  "terrain": [
    "#########",
    "#-.-----#",
    "#.------#",
    "#.---.###",
    "#---..#__",
    "#######__"
  ],
  "initialPlayer": {
    "x": 7,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 6,
      "y": 1
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 5,
      "y": 2
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 4,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Far Orbit 136",
    "concept": "introduce counterintuitive-routing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Wt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-137-counterintuitive-routing-practice",
  "revision": 4,
  "width": 9,
  "height": 6,
  "terrain": [
    "#########",
    "#--.----#",
    "#--.----#",
    "###.----#",
    "__#-...-#",
    "__#######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 1
    },
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 5,
      "y": 2
    },
    {
      "x": 4,
      "y": 3
    }
  ],
  "metadata": {
    "title": "Far Orbit 137",
    "concept": "practice counterintuitive-routing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Gt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-138-counterintuitive-routing-combine",
  "revision": 3,
  "width": 8,
  "height": 6,
  "terrain": [
    "__######",
    "###----#",
    "#--.--.#",
    "#-----.#",
    "###...-#",
    "__######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 5,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Far Orbit 138",
    "concept": "combine counterintuitive-routing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Kt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-139-counterintuitive-routing-test",
  "revision": 3,
  "width": 8,
  "height": 6,
  "terrain": [
    "########",
    "#---.-.#",
    "#-----.#",
    "###----#",
    "__#-...#",
    "__######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 1
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 5,
      "y": 2
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 6,
      "y": 3
    }
  ],
  "metadata": {
    "title": "Far Orbit 139",
    "concept": "test counterintuitive-routing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,qt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-14-relay-test",
  "revision": 1,
  "width": 8,
  "height": 7,
  "terrain": [
    "########",
    "#------#",
    "#.#-#--#",
    "#---##-#",
    "#---#--#",
    "#-----.#",
    "########"
  ],
  "initialPlayer": {
    "x": 6,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 6,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    }
  ],
  "metadata": {
    "title": "Relay Test",
    "concept": "sequence two box routes",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Jt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-140-counterintuitive-routing-recover",
  "revision": 4,
  "width": 7,
  "height": 8,
  "terrain": [
    "####___",
    "#--#___",
    "#--####",
    "#-....#",
    "#.----#",
    "#-----#",
    "#-----#",
    "#######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 1,
      "y": 2
    },
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 2,
      "y": 5
    },
    {
      "x": 3,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Far Orbit 140",
    "concept": "counterintuitive-routing recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Yt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-141-counterintuitive-routing-teach",
  "revision": 4,
  "width": 7,
  "height": 7,
  "terrain": [
    "_######",
    "_#-...#",
    "_#----#",
    "##.--.#",
    "#-----#",
    "#--.--#",
    "#######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 4
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 4,
      "y": 4
    },
    {
      "x": 2,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Far Orbit 141",
    "concept": "introduce counterintuitive-routing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Xt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-142-counterintuitive-routing-practice",
  "revision": 4,
  "width": 7,
  "height": 7,
  "terrain": [
    "######_",
    "#.-.-#_",
    "#.---##",
    "#---.-#",
    "#-----#",
    "#..--##",
    "######_"
  ],
  "initialPlayer": {
    "x": 5,
    "y": 3
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 1,
      "y": 4
    },
    {
      "x": 4,
      "y": 4
    },
    {
      "x": 3,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Far Orbit 142",
    "concept": "practice counterintuitive-routing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Zt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-143-counterintuitive-routing-combine",
  "revision": 3,
  "width": 8,
  "height": 6,
  "terrain": [
    "######__",
    "#..-.#__",
    "#---.###",
    "#---.--#",
    "#---.--#",
    "########"
  ],
  "initialPlayer": {
    "x": 6,
    "y": 3
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 1
    },
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 1,
      "y": 3
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 4,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Far Orbit 143",
    "concept": "combine counterintuitive-routing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Qt=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-144-counterintuitive-routing-test",
  "revision": 4,
  "width": 8,
  "height": 6,
  "terrain": [
    "######__",
    "#..--###",
    "#.-----#",
    "#------#",
    "#...-###",
    "######__"
  ],
  "initialPlayer": {
    "x": 5,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 1
    },
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 1,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 3,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Far Orbit 144",
    "concept": "test counterintuitive-routing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,$t=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-145-counterintuitive-routing-recover",
  "revision": 4,
  "width": 9,
  "height": 6,
  "terrain": [
    "#######__",
    "#.----#__",
    "#----.###",
    "#----.--#",
    "#-..----#",
    "#########"
  ],
  "initialPlayer": {
    "x": 6,
    "y": 3
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 1,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 6,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Far Orbit 145",
    "concept": "counterintuitive-routing recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,en=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-146-counterintuitive-routing-teach",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "__####",
    "###--#",
    "#--.-#",
    "#---.#",
    "#.--.#",
    "#----#",
    "#--..#",
    "######"
  ],
  "initialPlayer": {
    "x": 3,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 3,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Far Orbit 146",
    "concept": "introduce counterintuitive-routing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,tn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-147-counterintuitive-routing-practice",
  "revision": 4,
  "width": 7,
  "height": 8,
  "terrain": [
    "####___",
    "#--#___",
    "#--####",
    "#.....#",
    "#----.#",
    "#-----#",
    "#-----#",
    "#######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 1,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 4,
      "y": 4
    },
    {
      "x": 3,
      "y": 5
    },
    {
      "x": 4,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Far Orbit 147",
    "concept": "practice counterintuitive-routing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,nn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-148-counterintuitive-routing-combine",
  "revision": 4,
  "width": 8,
  "height": 6,
  "terrain": [
    "__######",
    "__#.-..#",
    "###.---#",
    "#------#",
    "#---.-.#",
    "########"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 3
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 6,
      "y": 3
    },
    {
      "x": 3,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Far Orbit 148",
    "concept": "combine counterintuitive-routing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,rn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-149-counterintuitive-routing-test",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "######",
    "#.---#",
    "#.---#",
    "#.---#",
    "#.-..#",
    "#--###",
    "#--#__",
    "####__"
  ],
  "initialPlayer": {
    "x": 2,
    "y": 5
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 1,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Far Orbit 149",
    "concept": "test counterintuitive-routing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,an=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-15-twin-rest",
  "revision": 1,
  "width": 7,
  "height": 8,
  "terrain": [
    "#######",
    "#-----#",
    "#---.-#",
    "#--#-.#",
    "#-#---#",
    "#--#--#",
    "#-----#",
    "#######"
  ],
  "initialPlayer": {
    "x": 4,
    "y": 4
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 5,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Twin Rest",
    "concept": "two-box recovery",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,on=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-150-counterintuitive-routing-recover",
  "revision": 4,
  "width": 7,
  "height": 7,
  "terrain": [
    "######_",
    "#---.#_",
    "#---.##",
    "#-----#",
    "#---.-#",
    "#-..-##",
    "######_"
  ],
  "initialPlayer": {
    "x": 5,
    "y": 3
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 1
    },
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 4,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Far Orbit 150",
    "concept": "counterintuitive-routing recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,sn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-151-multi-box-dependency-teach",
  "revision": 3,
  "width": 7,
  "height": 7,
  "terrain": [
    "_######",
    "_#--.-#",
    "##.--.#",
    "#----.#",
    "#-.---#",
    "##.---#",
    "_######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 3
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 1
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 5,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Linked Observatory 151",
    "concept": "introduce multi-box-dependency",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,cn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-152-multi-box-dependency-practice",
  "revision": 4,
  "width": 8,
  "height": 7,
  "terrain": [
    "########",
    "#--..-.#",
    "#--.---#",
    "###---.#",
    "__#---.#",
    "__#----#",
    "__######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 1
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 5,
      "y": 2
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 3,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Linked Observatory 152",
    "concept": "practice multi-box-dependency",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,ln=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-153-multi-box-dependency-combine",
  "revision": 4,
  "width": 8,
  "height": 6,
  "terrain": [
    "######__",
    "#---.#__",
    "#.---###",
    "#------#",
    "#....--#",
    "########"
  ],
  "initialPlayer": {
    "x": 5,
    "y": 3
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 1
    },
    {
      "x": 1,
      "y": 3
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 5,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Linked Observatory 153",
    "concept": "combine multi-box-dependency",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,un=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-154-multi-box-dependency-test",
  "revision": 4,
  "width": 8,
  "height": 6,
  "terrain": [
    "########",
    "#...---#",
    "#------#",
    "#.---###",
    "#.--.#__",
    "######__"
  ],
  "initialPlayer": {
    "x": 6,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 5,
      "y": 1
    },
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 1,
      "y": 3
    },
    {
      "x": 2,
      "y": 3
    }
  ],
  "metadata": {
    "title": "Linked Observatory 154",
    "concept": "test multi-box-dependency",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,dn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-155-multi-box-dependency-recover",
  "revision": 4,
  "width": 7,
  "height": 8,
  "terrain": [
    "#######",
    "#-----#",
    "#-----#",
    "#-----#",
    "#.....#",
    "##--###",
    "_#--#__",
    "_####__"
  ],
  "initialPlayer": {
    "x": 3,
    "y": 5
  },
  "initialBoxes": [
    {
      "x": 1,
      "y": 2
    },
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 2,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Linked Observatory 155",
    "concept": "multi-box-dependency recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,fn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-156-multi-box-dependency-teach",
  "revision": 4,
  "width": 7,
  "height": 8,
  "terrain": [
    "#######",
    "#----.#",
    "#----.#",
    "#-----#",
    "#....-#",
    "###--##",
    "__#--#_",
    "__####_"
  ],
  "initialPlayer": {
    "x": 3,
    "y": 6
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 1
    },
    {
      "x": 1,
      "y": 3
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 4,
      "y": 4
    },
    {
      "x": 3,
      "y": 5
    },
    {
      "x": 4,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Linked Observatory 156",
    "concept": "introduce multi-box-dependency",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,pn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-157-multi-box-dependency-practice",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "__####",
    "###--#",
    "#----#",
    "#----#",
    "#.---#",
    "#.--.#",
    "#-...#",
    "######"
  ],
  "initialPlayer": {
    "x": 3,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 4,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Linked Observatory 157",
    "concept": "practice multi-box-dependency",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,mn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-158-multi-box-dependency-combine",
  "revision": 3,
  "width": 6,
  "height": 8,
  "terrain": [
    "_####_",
    "_#--#_",
    "##--##",
    "#.---#",
    "#---.#",
    "#---.#",
    "#..-.#",
    "######"
  ],
  "initialPlayer": {
    "x": 2,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 4,
      "y": 4
    },
    {
      "x": 3,
      "y": 5
    },
    {
      "x": 3,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Linked Observatory 158",
    "concept": "combine multi-box-dependency",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,hn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-159-multi-box-dependency-test",
  "revision": 3,
  "width": 6,
  "height": 8,
  "terrain": [
    "######",
    "#.-..#",
    "#.---#",
    "#.---#",
    "#---.#",
    "##--##",
    "_#--#_",
    "_####_"
  ],
  "initialPlayer": {
    "x": 2,
    "y": 5
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 1
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 3,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Linked Observatory 159",
    "concept": "test multi-box-dependency",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,gn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-16-step-away",
  "revision": 1,
  "width": 8,
  "height": 9,
  "terrain": [
    "########",
    "#--.---#",
    "#-#----#",
    "#-#.#--#",
    "#-#-##-#",
    "#-#----#",
    "#------#",
    "#------#",
    "########"
  ],
  "initialPlayer": {
    "x": 3,
    "y": 5
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 3,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Step Away",
    "concept": "first counterintuitive push",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,_n=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-160-multi-box-dependency-recover",
  "revision": 4,
  "width": 9,
  "height": 6,
  "terrain": [
    "#######__",
    "#....-###",
    "#----.--#",
    "#-------#",
    "#-----###",
    "#######__"
  ],
  "initialPlayer": {
    "x": 7,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 6,
      "y": 2
    },
    {
      "x": 1,
      "y": 3
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 5,
      "y": 3
    }
  ],
  "metadata": {
    "title": "Linked Observatory 160",
    "concept": "multi-box-dependency recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,vn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-161-multi-box-dependency-teach",
  "revision": 4,
  "width": 8,
  "height": 7,
  "terrain": [
    "########",
    "#---.--#",
    "#--.---#",
    "###---.#",
    "__#.---#",
    "__#.-.-#",
    "__######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 1
    },
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 6,
      "y": 2
    },
    {
      "x": 5,
      "y": 3
    }
  ],
  "metadata": {
    "title": "Linked Observatory 161",
    "concept": "introduce multi-box-dependency",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,yn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-162-multi-box-dependency-practice",
  "revision": 4,
  "width": 9,
  "height": 6,
  "terrain": [
    "#########",
    "#--...--#",
    "#-------#",
    "###-----#",
    "__#..-.-#",
    "__#######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 1
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 5,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Linked Observatory 162",
    "concept": "practice multi-box-dependency",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,bn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-163-multi-box-dependency-combine",
  "revision": 4,
  "width": 8,
  "height": 6,
  "terrain": [
    "__######",
    "###--..#",
    "#------#",
    "#------#",
    "###....#",
    "__######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 6,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 5,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Linked Observatory 163",
    "concept": "combine multi-box-dependency",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,xn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-164-multi-box-dependency-test",
  "revision": 4,
  "width": 8,
  "height": 6,
  "terrain": [
    "__######",
    "__#.-..#",
    "###.---#",
    "#-----.#",
    "#--.---#",
    "########"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 3
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 1
    },
    {
      "x": 5,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Linked Observatory 164",
    "concept": "test multi-box-dependency",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Sn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-165-multi-box-dependency-recover",
  "revision": 4,
  "width": 7,
  "height": 7,
  "terrain": [
    "######_",
    "#....#_",
    "#----##",
    "#---.-#",
    "#-----#",
    "#----##",
    "######_"
  ],
  "initialPlayer": {
    "x": 5,
    "y": 3
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 1,
      "y": 4
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 4,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Linked Observatory 165",
    "concept": "multi-box-dependency recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Cn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-166-multi-box-dependency-teach",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "######",
    "#.-..#",
    "#----#",
    "#----#",
    "#----#",
    "#-...#",
    "#--###",
    "####__"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 6
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 1
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 4,
      "y": 4
    },
    {
      "x": 1,
      "y": 5
    },
    {
      "x": 2,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Linked Observatory 166",
    "concept": "introduce multi-box-dependency",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,wn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-167-multi-box-dependency-practice",
  "revision": 4,
  "width": 7,
  "height": 7,
  "terrain": [
    "#######",
    "#--..-#",
    "#----.#",
    "##---.#",
    "_#---.#",
    "_#---.#",
    "_######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 1
    },
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 3,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Linked Observatory 167",
    "concept": "practice multi-box-dependency",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Tn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-168-multi-box-dependency-combine",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "######",
    "#-.-.#",
    "#.--.#",
    "#----#",
    "#..--#",
    "###--#",
    "__#--#",
    "__####"
  ],
  "initialPlayer": {
    "x": 3,
    "y": 5
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 1
    },
    {
      "x": 1,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 4,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Linked Observatory 168",
    "concept": "combine multi-box-dependency",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,En=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-169-multi-box-dependency-test",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "####__",
    "#--#__",
    "#--###",
    "#.-.-#",
    "#----#",
    "#.---#",
    "#.-..#",
    "######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 1,
      "y": 3
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 2,
      "y": 5
    },
    {
      "x": 3,
      "y": 5
    },
    {
      "x": 2,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Linked Observatory 169",
    "concept": "test multi-box-dependency",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Dn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-17-long-arc",
  "revision": 1,
  "width": 8,
  "height": 9,
  "terrain": [
    "########",
    "#------#",
    "#------#",
    "#--###-#",
    "#--##-.#",
    "#-#--#-#",
    "#------#",
    "#.-----#",
    "########"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 6
  },
  "initialBoxes": [
    {
      "x": 6,
      "y": 3
    },
    {
      "x": 1,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Long Arc",
    "concept": "move away before approaching",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,On=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-170-multi-box-dependency-recover",
  "revision": 4,
  "width": 9,
  "height": 6,
  "terrain": [
    "#########",
    "#--.--..#",
    "#--.----#",
    "###.----#",
    "__#-----#",
    "__#######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 1
    },
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 5,
      "y": 3
    }
  ],
  "metadata": {
    "title": "Linked Observatory 170",
    "concept": "multi-box-dependency recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,kn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-171-multi-box-dependency-teach",
  "revision": 4,
  "width": 9,
  "height": 6,
  "terrain": [
    "__#######",
    "__#.-..-#",
    "###.----#",
    "#--.----#",
    "#----.--#",
    "#########"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 3
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 1
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Linked Observatory 171",
    "concept": "introduce multi-box-dependency",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,An=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-172-multi-box-dependency-practice",
  "revision": 4,
  "width": 6,
  "height": 9,
  "terrain": [
    "__####",
    "__#--#",
    "###--#",
    "#-...#",
    "#----#",
    "#---.#",
    "#---.#",
    "#-.--#",
    "######"
  ],
  "initialPlayer": {
    "x": 3,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 3,
      "y": 5
    },
    {
      "x": 2,
      "y": 6
    },
    {
      "x": 3,
      "y": 7
    }
  ],
  "metadata": {
    "title": "Linked Observatory 172",
    "concept": "practice multi-box-dependency",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,jn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-173-multi-box-dependency-combine",
  "revision": 4,
  "width": 8,
  "height": 6,
  "terrain": [
    "__######",
    "###---.#",
    "#-----.#",
    "#-----.#",
    "###.-..#",
    "__######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 5,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 6,
      "y": 3
    }
  ],
  "metadata": {
    "title": "Linked Observatory 173",
    "concept": "combine multi-box-dependency",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Mn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-174-multi-box-dependency-test",
  "revision": 4,
  "width": 8,
  "height": 6,
  "terrain": [
    "######__",
    "#..-.###",
    "#------#",
    "#.-----#",
    "#.-.-###",
    "######__"
  ],
  "initialPlayer": {
    "x": 6,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 1,
      "y": 2
    },
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 5,
      "y": 2
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Linked Observatory 174",
    "concept": "test multi-box-dependency",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Nn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-175-multi-box-dependency-recover",
  "revision": 4,
  "width": 7,
  "height": 7,
  "terrain": [
    "_######",
    "##.---#",
    "#-----#",
    "#----.#",
    "##.--.#",
    "_#-.--#",
    "_######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 1
    },
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 3,
      "y": 3
    }
  ],
  "metadata": {
    "title": "Linked Observatory 175",
    "concept": "multi-box-dependency recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Pn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-176-multi-box-dependency-teach",
  "revision": 4,
  "width": 7,
  "height": 7,
  "terrain": [
    "######_",
    "#-.--#_",
    "#.---##",
    "#.----#",
    "#.--.-#",
    "#.---##",
    "######_"
  ],
  "initialPlayer": {
    "x": 5,
    "y": 3
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 4,
      "y": 4
    },
    {
      "x": 3,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Linked Observatory 176",
    "concept": "introduce multi-box-dependency",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Fn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-177-multi-box-dependency-practice",
  "revision": 4,
  "width": 6,
  "height": 9,
  "terrain": [
    "####__",
    "#--#__",
    "#--###",
    "#--..#",
    "#.---#",
    "#---.#",
    "#.--.#",
    "#----#",
    "######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 1,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 4,
      "y": 4
    },
    {
      "x": 1,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Linked Observatory 177",
    "concept": "practice multi-box-dependency",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,In=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-178-multi-box-dependency-combine",
  "revision": 4,
  "width": 8,
  "height": 6,
  "terrain": [
    "__######",
    "###.-..#",
    "#------#",
    "#------#",
    "###.-..#",
    "__######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 6,
      "y": 3
    },
    {
      "x": 4,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Linked Observatory 178",
    "concept": "combine multi-box-dependency",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Ln=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-179-multi-box-dependency-test",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "_####_",
    "_#--#_",
    "##--##",
    "#.-..#",
    "#.---#",
    "#.---#",
    "#.---#",
    "######"
  ],
  "initialPlayer": {
    "x": 2,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 1,
      "y": 4
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 2,
      "y": 5
    },
    {
      "x": 4,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Linked Observatory 179",
    "concept": "test multi-box-dependency",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Rn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-18-cross-current",
  "revision": 1,
  "width": 8,
  "height": 9,
  "terrain": [
    "########",
    "#------#",
    "#---##-#",
    "#------#",
    "#-#--#.#",
    "#--###-#",
    "#------#",
    "#----.-#",
    "########"
  ],
  "initialPlayer": {
    "x": 3,
    "y": 6
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 6
    },
    {
      "x": 5,
      "y": 7
    }
  ],
  "metadata": {
    "title": "Cross Current",
    "concept": "combine reversal and box order",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,zn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-180-multi-box-dependency-recover",
  "revision": 4,
  "width": 7,
  "height": 7,
  "terrain": [
    "######_",
    "#-...#_",
    "#.---#_",
    "#---.##",
    "#-----#",
    "#-----#",
    "#######"
  ],
  "initialPlayer": {
    "x": 5,
    "y": 4
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 1,
      "y": 4
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 4,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Linked Observatory 180",
    "concept": "multi-box-dependency recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Bn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-181-mixed-mastery-teach",
  "revision": 4,
  "width": 6,
  "height": 9,
  "terrain": [
    "_####_",
    "_#--#_",
    "##--##",
    "#----#",
    "#---.#",
    "#---.#",
    "#---.#",
    "#-...#",
    "######"
  ],
  "initialPlayer": {
    "x": 2,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 2,
      "y": 5
    },
    {
      "x": 2,
      "y": 6
    },
    {
      "x": 3,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Grand Constellation 181",
    "concept": "introduce mixed-mastery",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Vn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-182-mixed-mastery-practice",
  "revision": 4,
  "width": 7,
  "height": 8,
  "terrain": [
    "####___",
    "#--#___",
    "#--####",
    "#.-..-#",
    "#-----#",
    "#----.#",
    "#.---.#",
    "#######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 1,
      "y": 2
    },
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 5,
      "y": 4
    },
    {
      "x": 2,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Grand Constellation 182",
    "concept": "practice mixed-mastery",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Hn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-183-mixed-mastery-combine",
  "revision": 4,
  "width": 8,
  "height": 6,
  "terrain": [
    "########",
    "#---.-.#",
    "#-----.#",
    "###----#",
    "__#-...#",
    "__######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 1
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 6,
      "y": 3
    }
  ],
  "metadata": {
    "title": "Grand Constellation 183",
    "concept": "combine mixed-mastery",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Un=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-184-mixed-mastery-test",
  "revision": 4,
  "width": 8,
  "height": 6,
  "terrain": [
    "######__",
    "#--..###",
    "#------#",
    "#---.--#",
    "#.-..###",
    "######__"
  ],
  "initialPlayer": {
    "x": 6,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 1
    },
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 5,
      "y": 2
    },
    {
      "x": 5,
      "y": 3
    }
  ],
  "metadata": {
    "title": "Grand Constellation 184",
    "concept": "test mixed-mastery",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Wn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-185-mixed-mastery-recover",
  "revision": 4,
  "width": 9,
  "height": 6,
  "terrain": [
    "#######__",
    "#-----###",
    "#.------#",
    "#-------#",
    "#-....###",
    "#######__"
  ],
  "initialPlayer": {
    "x": 7,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 6,
      "y": 2
    },
    {
      "x": 1,
      "y": 3
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 6,
      "y": 3
    }
  ],
  "metadata": {
    "title": "Grand Constellation 185",
    "concept": "mixed-mastery recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Gn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-186-mixed-mastery-teach",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "__####",
    "###--#",
    "#----#",
    "#---.#",
    "#----#",
    "#---.#",
    "#....#",
    "######"
  ],
  "initialPlayer": {
    "x": 3,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 4,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Grand Constellation 186",
    "concept": "introduce mixed-mastery",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Kn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-187-mixed-mastery-practice",
  "revision": 5,
  "width": 6,
  "height": 8,
  "terrain": [
    "######",
    "#--..#",
    "#---.#",
    "#----#",
    "#.---#",
    "#-..-#",
    "###--#",
    "__####"
  ],
  "initialPlayer": {
    "x": 3,
    "y": 6
  },
  "initialBoxes": [
    {
      "x": 1,
      "y": 3
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 3,
      "y": 5
    },
    {
      "x": 4,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Grand Constellation 187",
    "concept": "practice mixed-mastery",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,qn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-188-mixed-mastery-combine",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "######",
    "#-.-.#",
    "#---.#",
    "#----#",
    "#.-..#",
    "##--##",
    "_#--#_",
    "_####_"
  ],
  "initialPlayer": {
    "x": 2,
    "y": 5
  },
  "initialBoxes": [
    {
      "x": 1,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 3,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Grand Constellation 188",
    "concept": "combine mixed-mastery",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Jn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-189-mixed-mastery-test",
  "revision": 3,
  "width": 8,
  "height": 6,
  "terrain": [
    "__######",
    "__#-.--#",
    "###----#",
    "#--.---#",
    "#--....#",
    "########"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 3
  },
  "initialBoxes": [
    {
      "x": 5,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Grand Constellation 189",
    "concept": "test mixed-mastery",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Yn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-19-retrograde",
  "revision": 1,
  "width": 8,
  "height": 9,
  "terrain": [
    "########",
    "#-----.#",
    "#---##-#",
    "#------#",
    "#--#-#-#",
    "#-#---.#",
    "#----#-#",
    "#------#",
    "########"
  ],
  "initialPlayer": {
    "x": 5,
    "y": 3
  },
  "initialBoxes": [
    {
      "x": 6,
      "y": 2
    },
    {
      "x": 4,
      "y": 3
    }
  ],
  "metadata": {
    "title": "Retrograde",
    "concept": "test multiple counterintuitive pushes",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Xn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-190-mixed-mastery-recover",
  "revision": 4,
  "width": 7,
  "height": 7,
  "terrain": [
    "_######",
    "_#..-.#",
    "##----#",
    "#-----#",
    "#----.#",
    "##-.--#",
    "_######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 3
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 3,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Grand Constellation 190",
    "concept": "mixed-mastery recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Zn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-191-mixed-mastery-teach",
  "revision": 4,
  "width": 6,
  "height": 9,
  "terrain": [
    "####__",
    "#--#__",
    "#--###",
    "#.---#",
    "#.---#",
    "#.---#",
    "#.---#",
    "#.-.-#",
    "######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 1,
      "y": 2
    },
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 2,
      "y": 5
    },
    {
      "x": 2,
      "y": 6
    },
    {
      "x": 2,
      "y": 7
    }
  ],
  "metadata": {
    "title": "Grand Constellation 191",
    "concept": "introduce mixed-mastery",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Qn=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-192-mixed-mastery-practice",
  "revision": 4,
  "width": 9,
  "height": 6,
  "terrain": [
    "__#######",
    "__#-----#",
    "###.---.#",
    "#--.----#",
    "#--..--.#",
    "#########"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 3
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 7,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Grand Constellation 192",
    "concept": "practice mixed-mastery",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,$n=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-193-mixed-mastery-combine",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "_####_",
    "_#--#_",
    "##--##",
    "#----#",
    "#---.#",
    "#.--.#",
    "#.-..#",
    "######"
  ],
  "initialPlayer": {
    "x": 2,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 1,
      "y": 4
    },
    {
      "x": 3,
      "y": 5
    },
    {
      "x": 4,
      "y": 5
    },
    {
      "x": 2,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Grand Constellation 193",
    "concept": "combine mixed-mastery",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,er=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-194-mixed-mastery-test",
  "revision": 4,
  "width": 8,
  "height": 6,
  "terrain": [
    "######__",
    "#...-#__",
    "#.---###",
    "#.-----#",
    "#---.--#",
    "########"
  ],
  "initialPlayer": {
    "x": 6,
    "y": 3
  },
  "initialBoxes": [
    {
      "x": 1,
      "y": 2
    },
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 5,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Grand Constellation 194",
    "concept": "test mixed-mastery",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,tr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-195-mixed-mastery-recover",
  "revision": 4,
  "width": 9,
  "height": 6,
  "terrain": [
    "#######__",
    "#.----###",
    "#-------#",
    "#-------#",
    "#-....###",
    "#######__"
  ],
  "initialPlayer": {
    "x": 7,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 6,
      "y": 2
    },
    {
      "x": 1,
      "y": 3
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 6,
      "y": 3
    }
  ],
  "metadata": {
    "title": "Grand Constellation 195",
    "concept": "mixed-mastery recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,nr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-196-mixed-mastery-teach",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "####__",
    "#--###",
    "#.--.#",
    "#----#",
    "#---.#",
    "#.---#",
    "#-.-.#",
    "######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 1,
      "y": 2
    },
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 3,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Grand Constellation 196",
    "concept": "introduce mixed-mastery",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,rr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-197-mixed-mastery-practice",
  "revision": 4,
  "width": 8,
  "height": 7,
  "terrain": [
    "######__",
    "#.-..###",
    "#.--.--#",
    "#.-----#",
    "#----###",
    "#----#__",
    "######__"
  ],
  "initialPlayer": {
    "x": 6,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 5,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 4,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Grand Constellation 197",
    "concept": "practice mixed-mastery",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,ir=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-198-mixed-mastery-combine",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "####__",
    "#--#__",
    "#--###",
    "#.---#",
    "#.---#",
    "#.---#",
    "#.-..#",
    "######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 1,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 2,
      "y": 5
    },
    {
      "x": 3,
      "y": 5
    },
    {
      "x": 2,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Grand Constellation 198",
    "concept": "combine mixed-mastery",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,ar=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-199-mixed-mastery-test",
  "revision": 3,
  "width": 8,
  "height": 6,
  "terrain": [
    "########",
    "#----.-#",
    "#------#",
    "###.--.#",
    "__#.-..#",
    "__######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 1
    },
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 4,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Grand Constellation 199",
    "concept": "test mixed-mastery",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,or=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-20-homeward",
  "revision": 1,
  "width": 9,
  "height": 8,
  "terrain": [
    "#########",
    "#----.--#",
    "#-#-----#",
    "#--#----#",
    "#-##--#-#",
    "#---##--#",
    "#--.----#",
    "#########"
  ],
  "initialPlayer": {
    "x": 6,
    "y": 6
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 1
    },
    {
      "x": 5,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Homeward",
    "concept": "counterintuitive recovery",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,sr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-200-mixed-mastery-recover",
  "revision": 4,
  "width": 9,
  "height": 6,
  "terrain": [
    "#########",
    "#--.--.-#",
    "#--.----#",
    "###-----#",
    "__#..---#",
    "__#######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 1
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 6,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Grand Constellation 200",
    "concept": "mixed-mastery recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,cr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-21-shared-lane",
  "revision": 1,
  "width": 10,
  "height": 9,
  "terrain": [
    "##########",
    "#--------#",
    "#---#-#--#",
    "#---#----#",
    "#--#.##--#",
    "#--#-#---#",
    "#-##---.-#",
    "#------.-#",
    "##########"
  ],
  "initialPlayer": {
    "x": 7,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 7,
      "y": 3
    },
    {
      "x": 5,
      "y": 6
    },
    {
      "x": 7,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Shared Lane",
    "concept": "introduce shared box paths",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,lr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-22-traffic-flow",
  "revision": 1,
  "width": 10,
  "height": 9,
  "terrain": [
    "##########",
    "#.-------#",
    "#-.---##-#",
    "#--#-.#--#",
    "#--#-----#",
    "#--------#",
    "#--###---#",
    "#--------#",
    "##########"
  ],
  "initialPlayer": {
    "x": 4,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 2,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Traffic Flow",
    "concept": "practice path congestion",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,ur=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-23-switchyard",
  "revision": 1,
  "width": 10,
  "height": 9,
  "terrain": [
    "##########",
    "#--------#",
    "#.#---##-#",
    "#-#--#-#-#",
    "#.-------#",
    "#--#-#---#",
    "#--#--#--#",
    "#-------.#",
    "##########"
  ],
  "initialPlayer": {
    "x": 7,
    "y": 4
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 7,
      "y": 5
    },
    {
      "x": 2,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Switchyard",
    "concept": "combine congestion and switching",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,dr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-24-busy-orbit",
  "revision": 1,
  "width": 10,
  "height": 9,
  "terrain": [
    "##########",
    "#---.----#",
    "#-.-#----#",
    "#--#-----#",
    "#-----#--#",
    "#-.-##-#-#",
    "#---##-#-#",
    "#--------#",
    "##########"
  ],
  "initialPlayer": {
    "x": 2,
    "y": 6
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 2,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Busy Orbit",
    "concept": "test congested routing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,fr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-25-open-channel",
  "revision": 1,
  "width": 10,
  "height": 9,
  "terrain": [
    "##########",
    "#----.-.-#",
    "#-#--#---#",
    "#---#--.-#",
    "#--------#",
    "#----#-#-#",
    "#-#-#-#--#",
    "#--------#",
    "##########"
  ],
  "initialPlayer": {
    "x": 8,
    "y": 3
  },
  "initialBoxes": [
    {
      "x": 6,
      "y": 2
    },
    {
      "x": 7,
      "y": 2
    },
    {
      "x": 7,
      "y": 3
    }
  ],
  "metadata": {
    "title": "Open Channel",
    "concept": "congestion recovery",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,pr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-26-linked-stars",
  "revision": 1,
  "width": 10,
  "height": 9,
  "terrain": [
    "##########",
    "#--------#",
    "#----#-#-#",
    "#--#--.#-#",
    "#--#-#-#-#",
    "#-#--#--.#",
    "#-------.#",
    "#--------#",
    "##########"
  ],
  "initialPlayer": {
    "x": 5,
    "y": 6
  },
  "initialBoxes": [
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 4,
      "y": 4
    },
    {
      "x": 6,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Linked Stars",
    "concept": "introduce three-box coordination",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,mr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-27-dependency-chain",
  "revision": 1,
  "width": 11,
  "height": 10,
  "terrain": [
    "###########",
    "#---------#",
    "#-.----.--#",
    "#-.-#-#---#",
    "#-##-#----#",
    "#-------#-#",
    "#---#-###-#",
    "#-#--#-#--#",
    "#---------#",
    "###########"
  ],
  "initialPlayer": {
    "x": 9,
    "y": 4
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 7,
      "y": 2
    },
    {
      "x": 8,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Dependency Chain",
    "concept": "practice longer three-box sequencing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,hr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-28-night-shift",
  "revision": 1,
  "width": 11,
  "height": 10,
  "terrain": [
    "###########",
    "#---------#",
    "#-----##--#",
    "#--##---#-#",
    "#---------#",
    "#---------#",
    "#-####-#--#",
    "#.#-#-##.-#",
    "#-------.-#",
    "###########"
  ],
  "initialPlayer": {
    "x": 2,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 8,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Night Shift",
    "concept": "combine box switching and route overlap",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,gr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-29-grand-observatory",
  "revision": 1,
  "width": 11,
  "height": 10,
  "terrain": [
    "###########",
    "#------.--#",
    "#-###--##-#",
    "#--#------#",
    "#--###--#-#",
    "#-----#---#",
    "#----.----#",
    "#-.-#--##-#",
    "#---------#",
    "###########"
  ],
  "initialPlayer": {
    "x": 9,
    "y": 5
  },
  "initialBoxes": [
    {
      "x": 8,
      "y": 3
    },
    {
      "x": 8,
      "y": 5
    },
    {
      "x": 6,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Grand Observatory",
    "concept": "test extended three-box synthesis",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,_r=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-30-dawn-return",
  "revision": 1,
  "width": 10,
  "height": 11,
  "terrain": [
    "##########",
    "#-----.--#",
    "#--#.-#--#",
    "#-#------#",
    "#----.#--#",
    "#-#-#----#",
    "#-----#--#",
    "#-#--##--#",
    "#-##-----#",
    "#--------#",
    "##########"
  ],
  "initialPlayer": {
    "x": 5,
    "y": 3
  },
  "initialBoxes": [
    {
      "x": 5,
      "y": 2
    },
    {
      "x": 3,
      "y": 5
    },
    {
      "x": 5,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Dawn Return",
    "concept": "three-box recovery",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,vr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-31-sequencing-teach",
  "revision": 3,
  "width": 9,
  "height": 9,
  "terrain": [
    "#########",
    "#####-.##",
    "####-#.-#",
    "###---.-#",
    "#------##",
    "#-------#",
    "#-------#",
    "#-------#",
    "#########"
  ],
  "initialPlayer": {
    "x": 4,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 6,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Star Sequence 031",
    "concept": "introduce sequencing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,yr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-32-sequencing-practice",
  "revision": 3,
  "width": 10,
  "height": 9,
  "terrain": [
    "##########",
    "#####----#",
    "###--##-##",
    "###-.----#",
    "####-----#",
    "##--.----#",
    "##-------#",
    "####----.#",
    "##########"
  ],
  "initialPlayer": {
    "x": 4,
    "y": 7
  },
  "initialBoxes": [
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 3,
      "y": 6
    },
    {
      "x": 4,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Star Sequence 032",
    "concept": "practice sequencing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,br=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-33-sequencing-combine",
  "revision": 3,
  "width": 9,
  "height": 9,
  "terrain": [
    "#########",
    "#####-#-#",
    "####----#",
    "###----##",
    "###---#-#",
    "##.-----#",
    "#-..-#--#",
    "#---#---#",
    "#########"
  ],
  "initialPlayer": {
    "x": 5,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 5,
      "y": 2
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 4,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Star Sequence 033",
    "concept": "combine sequencing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,xr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-34-sequencing-test",
  "revision": 3,
  "width": 10,
  "height": 9,
  "terrain": [
    "##########",
    "######--##",
    "#####.#--#",
    "##---..--#",
    "##-------#",
    "##--###--#",
    "###-##---#",
    "#######--#",
    "##########"
  ],
  "initialPlayer": {
    "x": 6,
    "y": 4
  },
  "initialBoxes": [
    {
      "x": 5,
      "y": 4
    },
    {
      "x": 7,
      "y": 4
    },
    {
      "x": 7,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Star Sequence 034",
    "concept": "test sequencing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Sr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-35-sequencing-recover",
  "revision": 3,
  "width": 10,
  "height": 9,
  "terrain": [
    "##########",
    "##########",
    "#####-#--#",
    "#####--.-#",
    "######---#",
    "##--##---#",
    "###-#----#",
    "###-.----#",
    "##########"
  ],
  "initialPlayer": {
    "x": 5,
    "y": 6
  },
  "initialBoxes": [
    {
      "x": 6,
      "y": 5
    },
    {
      "x": 6,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Star Sequence 035",
    "concept": "sequencing recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Cr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-36-sequencing-teach",
  "revision": 3,
  "width": 10,
  "height": 10,
  "terrain": [
    "##########",
    "##########",
    "#######-##",
    "#####-#--#",
    "#-##-----#",
    "#---#-####",
    "#--#-----#",
    "#-----.-##",
    "#.---.-###",
    "##########"
  ],
  "initialPlayer": {
    "x": 5,
    "y": 8
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 7
    },
    {
      "x": 4,
      "y": 7
    },
    {
      "x": 4,
      "y": 8
    }
  ],
  "metadata": {
    "title": "Star Sequence 036",
    "concept": "introduce sequencing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,wr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-37-sequencing-practice",
  "revision": 3,
  "width": 9,
  "height": 10,
  "terrain": [
    "#########",
    "##-######",
    "#----####",
    "##-#--###",
    "#----##-#",
    "#---#-#-#",
    "#.#-----#",
    "#.--#-###",
    "#.#---###",
    "#########"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 4
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 1,
      "y": 5
    },
    {
      "x": 3,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Star Sequence 037",
    "concept": "practice sequencing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Tr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-38-sequencing-combine",
  "revision": 3,
  "width": 9,
  "height": 9,
  "terrain": [
    "#########",
    "#.---#--#",
    "#.------#",
    "#.------#",
    "#--#--#-#",
    "##-#-####",
    "##-######",
    "#########",
    "#########"
  ],
  "initialPlayer": {
    "x": 4,
    "y": 3
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 5,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    }
  ],
  "metadata": {
    "title": "Star Sequence 038",
    "concept": "combine sequencing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Er=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-39-sequencing-test",
  "revision": 3,
  "width": 10,
  "height": 9,
  "terrain": [
    "##########",
    "###-#--#-#",
    "#-------.#",
    "#----#---#",
    "###.-.#-##",
    "##-----###",
    "#--#-#####",
    "#-----####",
    "##########"
  ],
  "initialPlayer": {
    "x": 6,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 5,
      "y": 2
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 4,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Star Sequence 039",
    "concept": "test sequencing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Dr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-40-sequencing-recover",
  "revision": 3,
  "width": 10,
  "height": 9,
  "terrain": [
    "##########",
    "##########",
    "#####-####",
    "#####--###",
    "##--#-####",
    "###--.-###",
    "##-----###",
    "#.---#--##",
    "##########"
  ],
  "initialPlayer": {
    "x": 5,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 3,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Star Sequence 040",
    "concept": "sequencing recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Or=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-41-sequencing-teach",
  "revision": 3,
  "width": 9,
  "height": 10,
  "terrain": [
    "#########",
    "####-#--#",
    "#-------#",
    "#------##",
    "##------#",
    "##--.-###",
    "####.####",
    "####.####",
    "#########",
    "#########"
  ],
  "initialPlayer": {
    "x": 4,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 4,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Star Sequence 041",
    "concept": "introduce sequencing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,kr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-42-sequencing-practice",
  "revision": 3,
  "width": 9,
  "height": 10,
  "terrain": [
    "#########",
    "#---...##",
    "#-#--#-##",
    "#----####",
    "#---#####",
    "#---#####",
    "#--#--###",
    "#----####",
    "##-----##",
    "#########"
  ],
  "initialPlayer": {
    "x": 3,
    "y": 5
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 1
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 2,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Star Sequence 042",
    "concept": "practice sequencing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Ar=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-43-sequencing-combine",
  "revision": 4,
  "width": 10,
  "height": 10,
  "terrain": [
    "##########",
    "#--.---#-#",
    "#-#-#----#",
    "#--.-----#",
    "#.--#--###",
    "###--#####",
    "##########",
    "##########",
    "##########",
    "##########"
  ],
  "initialPlayer": {
    "x": 3,
    "y": 5
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 1
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 3,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Star Sequence 043",
    "concept": "combine sequencing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,jr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-44-sequencing-test",
  "revision": 3,
  "width": 9,
  "height": 10,
  "terrain": [
    "#########",
    "#-..#-###",
    "#-.#----#",
    "#------##",
    "#-------#",
    "#----#-##",
    "#--#---##",
    "#--######",
    "##-######",
    "#########"
  ],
  "initialPlayer": {
    "x": 2,
    "y": 8
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 5
    },
    {
      "x": 4,
      "y": 5
    },
    {
      "x": 2,
      "y": 7
    }
  ],
  "metadata": {
    "title": "Star Sequence 044",
    "concept": "test sequencing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Mr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-45-sequencing-recover",
  "revision": 3,
  "width": 9,
  "height": 10,
  "terrain": [
    "#########",
    "#-----###",
    "#-----###",
    "#------##",
    "#----..##",
    "#-###-###",
    "#####-###",
    "#####-###",
    "#########",
    "#########"
  ],
  "initialPlayer": {
    "x": 5,
    "y": 7
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 5,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Star Sequence 045",
    "concept": "sequencing recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Nr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-46-sequencing-teach",
  "revision": 4,
  "width": 10,
  "height": 10,
  "terrain": [
    "##########",
    "#####----#",
    "#######--#",
    "####-##--#",
    "##--.----#",
    "#------.##",
    "###-#-#--#",
    "###-#-##-#",
    "##--#.####",
    "##########"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 5
  },
  "initialBoxes": [
    {
      "x": 7,
      "y": 4
    },
    {
      "x": 2,
      "y": 5
    },
    {
      "x": 5,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Star Sequence 046",
    "concept": "introduce sequencing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Pr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-47-sequencing-practice",
  "revision": 3,
  "width": 10,
  "height": 10,
  "terrain": [
    "##########",
    "######-###",
    "####---###",
    "#####--###",
    "####---###",
    "####---###",
    "#####.--##",
    "##.----.-#",
    "##------##",
    "##########"
  ],
  "initialPlayer": {
    "x": 7,
    "y": 6
  },
  "initialBoxes": [
    {
      "x": 5,
      "y": 5
    },
    {
      "x": 6,
      "y": 5
    },
    {
      "x": 6,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Star Sequence 047",
    "concept": "practice sequencing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Fr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-48-sequencing-combine",
  "revision": 3,
  "width": 9,
  "height": 9,
  "terrain": [
    "#########",
    "#---..#-#",
    "###--.--#",
    "##------#",
    "###-----#",
    "####----#",
    "####-#--#",
    "###--#--#",
    "#########"
  ],
  "initialPlayer": {
    "x": 7,
    "y": 5
  },
  "initialBoxes": [
    {
      "x": 6,
      "y": 4
    },
    {
      "x": 6,
      "y": 5
    },
    {
      "x": 6,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Star Sequence 048",
    "concept": "combine sequencing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Ir=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-49-sequencing-test",
  "revision": 3,
  "width": 10,
  "height": 9,
  "terrain": [
    "##########",
    "#####----#",
    "####--#--#",
    "####-----#",
    "###.--#--#",
    "#-#---#-##",
    "#----.--##",
    "##----.-##",
    "##########"
  ],
  "initialPlayer": {
    "x": 7,
    "y": 5
  },
  "initialBoxes": [
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 7,
      "y": 4
    },
    {
      "x": 7,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Star Sequence 049",
    "concept": "test sequencing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Lr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-50-sequencing-recover",
  "revision": 3,
  "width": 10,
  "height": 10,
  "terrain": [
    "##########",
    "##########",
    "#-##-#####",
    "#-#--#####",
    "#-----####",
    "#-----####",
    "#-----.###",
    "##--.--###",
    "####--####",
    "##########"
  ],
  "initialPlayer": {
    "x": 4,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Star Sequence 050",
    "concept": "sequencing recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Rr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-51-sequencing-teach",
  "revision": 3,
  "width": 10,
  "height": 10,
  "terrain": [
    "##########",
    "##--######",
    "##--######",
    "###.--####",
    "###-######",
    "#-------##",
    "###-#--#-#",
    "###------#",
    "###.--.-##",
    "##########"
  ],
  "initialPlayer": {
    "x": 3,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 7
    },
    {
      "x": 5,
      "y": 8
    }
  ],
  "metadata": {
    "title": "Star Sequence 051",
    "concept": "introduce sequencing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,zr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-52-sequencing-practice",
  "revision": 3,
  "width": 10,
  "height": 9,
  "terrain": [
    "##########",
    "######---#",
    "######---#",
    "#####.#--#",
    "####----##",
    "##--#----#",
    "##-----..#",
    "###-#-####",
    "##########"
  ],
  "initialPlayer": {
    "x": 5,
    "y": 7
  },
  "initialBoxes": [
    {
      "x": 7,
      "y": 3
    },
    {
      "x": 6,
      "y": 4
    },
    {
      "x": 5,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Star Sequence 052",
    "concept": "practice sequencing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Br=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-53-sequencing-combine",
  "revision": 3,
  "width": 9,
  "height": 9,
  "terrain": [
    "#########",
    "####---##",
    "###-----#",
    "##-#---##",
    "##---#--#",
    "#-----#-#",
    "##----#-#",
    "###--...#",
    "#########"
  ],
  "initialPlayer": {
    "x": 7,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 6,
      "y": 2
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 4,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Star Sequence 053",
    "concept": "combine sequencing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Vr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-54-sequencing-test",
  "revision": 3,
  "width": 10,
  "height": 9,
  "terrain": [
    "##########",
    "##-.---#-#",
    "#-------.#",
    "###--#---#",
    "#####-.-##",
    "#####----#",
    "####-##--#",
    "###------#",
    "##########"
  ],
  "initialPlayer": {
    "x": 8,
    "y": 5
  },
  "initialBoxes": [
    {
      "x": 7,
      "y": 3
    },
    {
      "x": 7,
      "y": 5
    },
    {
      "x": 7,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Star Sequence 054",
    "concept": "test sequencing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Hr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-55-sequencing-recover",
  "revision": 3,
  "width": 9,
  "height": 10,
  "terrain": [
    "#########",
    "##--#####",
    "#.---####",
    "#.---####",
    "#-----###",
    "###-----#",
    "#---#####",
    "##--#####",
    "#########",
    "#########"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 6
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 4
    },
    {
      "x": 2,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Star Sequence 055",
    "concept": "sequencing recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Ur=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-56-sequencing-teach",
  "revision": 3,
  "width": 10,
  "height": 10,
  "terrain": [
    "##########",
    "#----##--#",
    "###---##-#",
    "####-----#",
    "###.---.-#",
    "#####--.##",
    "####-##-##",
    "####-----#",
    "####-#---#",
    "##########"
  ],
  "initialPlayer": {
    "x": 4,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 6,
      "y": 3
    }
  ],
  "metadata": {
    "title": "Star Sequence 056",
    "concept": "introduce sequencing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Wr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-57-sequencing-practice",
  "revision": 3,
  "width": 10,
  "height": 10,
  "terrain": [
    "##########",
    "#.#-######",
    "#---##-###",
    "#---##---#",
    "#.----.###",
    "#-------##",
    "#-#----###",
    "##----####",
    "####-#####",
    "##########"
  ],
  "initialPlayer": {
    "x": 4,
    "y": 8
  },
  "initialBoxes": [
    {
      "x": 5,
      "y": 5
    },
    {
      "x": 5,
      "y": 6
    },
    {
      "x": 4,
      "y": 7
    }
  ],
  "metadata": {
    "title": "Star Sequence 057",
    "concept": "practice sequencing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Gr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-58-sequencing-combine",
  "revision": 3,
  "width": 10,
  "height": 9,
  "terrain": [
    "##########",
    "####.--.-#",
    "#####----#",
    "##-------#",
    "###-###-.#",
    "##--###--#",
    "###-##---#",
    "#######-##",
    "##########"
  ],
  "initialPlayer": {
    "x": 8,
    "y": 6
  },
  "initialBoxes": [
    {
      "x": 7,
      "y": 3
    },
    {
      "x": 7,
      "y": 4
    },
    {
      "x": 8,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Star Sequence 058",
    "concept": "combine sequencing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Kr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-59-sequencing-test",
  "revision": 3,
  "width": 9,
  "height": 10,
  "terrain": [
    "#########",
    "#####--##",
    "####--###",
    "##----###",
    "##----###",
    "####---##",
    "#.#-----#",
    "#.-----##",
    "#.-----##",
    "#########"
  ],
  "initialPlayer": {
    "x": 7,
    "y": 6
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 4
    },
    {
      "x": 5,
      "y": 5
    },
    {
      "x": 6,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Star Sequence 059",
    "concept": "test sequencing",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,qr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-60-sequencing-recover",
  "revision": 3,
  "width": 9,
  "height": 10,
  "terrain": [
    "#########",
    "####-##-#",
    "##..----#",
    "###-----#",
    "###-#-#-#",
    "###-#---#",
    "####--#-#",
    "######--#",
    "#########",
    "#########"
  ],
  "initialPlayer": {
    "x": 5,
    "y": 6
  },
  "initialBoxes": [
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 5,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Star Sequence 060",
    "concept": "sequencing recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Jr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-61-staging-order-teach",
  "revision": 4,
  "width": 8,
  "height": 7,
  "terrain": [
    "########",
    "#--.---#",
    "#--.---#",
    "###.---#",
    "__#----#",
    "__#.-.-#",
    "__######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 1
    },
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 5,
      "y": 3
    }
  ],
  "metadata": {
    "title": "Starlight Stage 061",
    "concept": "introduce staging-order",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Yr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-62-staging-order-practice",
  "revision": 4,
  "width": 7,
  "height": 7,
  "terrain": [
    "_######",
    "_#...-#",
    "##---.#",
    "#-----#",
    "#-----#",
    "##---.#",
    "_######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 3
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 3,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Starlight Stage 062",
    "concept": "practice staging-order",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Xr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-63-staging-order-combine",
  "revision": 4,
  "width": 8,
  "height": 7,
  "terrain": [
    "__######",
    "__#..--#",
    "###.---#",
    "#--.---#",
    "#--.---#",
    "###----#",
    "__######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 3
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 5,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Starlight Stage 063",
    "concept": "combine staging-order",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Zr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-64-staging-order-test",
  "revision": 3,
  "width": 7,
  "height": 7,
  "terrain": [
    "######_",
    "#....##",
    "#---.-#",
    "#-----#",
    "#----##",
    "#----#_",
    "######_"
  ],
  "initialPlayer": {
    "x": 5,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 1,
      "y": 3
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Starlight Stage 064",
    "concept": "test staging-order",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Qr=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-65-staging-order-recover",
  "revision": 4,
  "width": 7,
  "height": 7,
  "terrain": [
    "######_",
    "#-.--#_",
    "#----##",
    "#.----#",
    "#-----#",
    "#--..##",
    "######_"
  ],
  "initialPlayer": {
    "x": 5,
    "y": 3
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 4,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Starlight Stage 065",
    "concept": "staging-order recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,$r=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-66-staging-order-teach",
  "revision": 4,
  "width": 6,
  "height": 9,
  "terrain": [
    "######",
    "#--..#",
    "#----#",
    "#---.#",
    "#---.#",
    "#--.-#",
    "##--##",
    "_#--#_",
    "_####_"
  ],
  "initialPlayer": {
    "x": 2,
    "y": 6
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 2,
      "y": 5
    },
    {
      "x": 3,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Starlight Stage 066",
    "concept": "introduce staging-order",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,ei=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-67-staging-order-practice",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "######",
    "#----#",
    "#----#",
    "#----#",
    "#.--.#",
    "#-...#",
    "##--##",
    "_####_"
  ],
  "initialPlayer": {
    "x": 2,
    "y": 6
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 1,
      "y": 3
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 4,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Starlight Stage 067",
    "concept": "practice staging-order",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,ti=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-68-staging-order-combine",
  "revision": 4,
  "width": 8,
  "height": 7,
  "terrain": [
    "######__",
    "#--.-#__",
    "#---.#__",
    "#---.###",
    "#---.--#",
    "#---.--#",
    "########"
  ],
  "initialPlayer": {
    "x": 6,
    "y": 4
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 4,
      "y": 4
    },
    {
      "x": 5,
      "y": 4
    },
    {
      "x": 5,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Starlight Stage 068",
    "concept": "combine staging-order",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,ni=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-69-staging-order-test",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "_####_",
    "##--##",
    "#----#",
    "#----#",
    "#---.#",
    "#---.#",
    "#-...#",
    "######"
  ],
  "initialPlayer": {
    "x": 2,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 3,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Starlight Stage 069",
    "concept": "test staging-order",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,ri=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-70-staging-order-recover",
  "revision": 4,
  "width": 7,
  "height": 7,
  "terrain": [
    "_######",
    "_#.---#",
    "_#----#",
    "##----#",
    "#-----#",
    "#-...-#",
    "#######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 4
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 2,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Starlight Stage 070",
    "concept": "staging-order recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,ii=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-71-staging-order-teach",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "_####_",
    "##--##",
    "#.-..#",
    "#.--.#",
    "#----#",
    "#----#",
    "#----#",
    "######"
  ],
  "initialPlayer": {
    "x": 2,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 4,
      "y": 4
    },
    {
      "x": 2,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Starlight Stage 071",
    "concept": "introduce staging-order",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,ai=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-72-staging-order-practice",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "__####",
    "###--#",
    "#.--.#",
    "#.---#",
    "#----#",
    "#---.#",
    "#---.#",
    "######"
  ],
  "initialPlayer": {
    "x": 3,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 1,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Starlight Stage 072",
    "concept": "practice staging-order",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,oi=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-73-staging-order-combine",
  "revision": 4,
  "width": 9,
  "height": 6,
  "terrain": [
    "#########",
    "#--.-.--#",
    "#-------#",
    "###.---.#",
    "__#.----#",
    "__#######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 1
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 5,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Starlight Stage 073",
    "concept": "combine staging-order",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,si=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-74-staging-order-test",
  "revision": 5,
  "width": 6,
  "height": 9,
  "terrain": [
    "######",
    "#----#",
    "#.---#",
    "#.---#",
    "#.---#",
    "#..--#",
    "#--###",
    "#--#__",
    "####__"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 7
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 2,
      "y": 5
    },
    {
      "x": 1,
      "y": 6
    },
    {
      "x": 2,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Starlight Stage 074",
    "concept": "test staging-order",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,ci=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-75-staging-order-recover",
  "revision": 4,
  "width": 9,
  "height": 6,
  "terrain": [
    "__#######",
    "###-..-.#",
    "#--.----#",
    "#-------#",
    "###-----#",
    "__#######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 6,
      "y": 3
    }
  ],
  "metadata": {
    "title": "Starlight Stage 075",
    "concept": "staging-order recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,li=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-76-staging-order-teach",
  "revision": 4,
  "width": 7,
  "height": 8,
  "terrain": [
    "####___",
    "#--#___",
    "#--####",
    "#-.-.-#",
    "#-----#",
    "#-----#",
    "#..-.-#",
    "#######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 1,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 4,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Starlight Stage 076",
    "concept": "introduce staging-order",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,ui=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-77-staging-order-practice",
  "revision": 4,
  "width": 8,
  "height": 7,
  "terrain": [
    "__######",
    "__#.---#",
    "__#----#",
    "###.---#",
    "#--.---#",
    "#--..--#",
    "########"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 4
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 4,
      "y": 4
    },
    {
      "x": 2,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Starlight Stage 077",
    "concept": "practice staging-order",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,di=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-78-staging-order-combine",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "######",
    "#...-#",
    "#.---#",
    "#.---#",
    "#----#",
    "#----#",
    "##--##",
    "_####_"
  ],
  "initialPlayer": {
    "x": 2,
    "y": 6
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 2,
      "y": 5
    },
    {
      "x": 3,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Starlight Stage 078",
    "concept": "combine staging-order",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,fi=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-79-staging-order-test",
  "revision": 3,
  "width": 7,
  "height": 7,
  "terrain": [
    "#######",
    "#--..-#",
    "#-----#",
    "##---.#",
    "_#----#",
    "_#-..-#",
    "_######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 1
    },
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 2,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Starlight Stage 079",
    "concept": "test staging-order",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,pi=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-80-staging-order-recover",
  "revision": 4,
  "width": 7,
  "height": 8,
  "terrain": [
    "___####",
    "___#--#",
    "####--#",
    "#.-.-.#",
    "#.----#",
    "#-----#",
    "#-----#",
    "#######"
  ],
  "initialPlayer": {
    "x": 4,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 5,
      "y": 2
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 4,
      "y": 4
    },
    {
      "x": 3,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Starlight Stage 080",
    "concept": "staging-order recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,mi=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-81-staging-order-teach",
  "revision": 4,
  "width": 8,
  "height": 7,
  "terrain": [
    "__######",
    "__#..--#",
    "__#----#",
    "###.---#",
    "#--.---#",
    "#--.---#",
    "########"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 4
  },
  "initialBoxes": [
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 4,
      "y": 4
    },
    {
      "x": 2,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Starlight Stage 081",
    "concept": "introduce staging-order",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,hi=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-82-staging-order-practice",
  "revision": 4,
  "width": 8,
  "height": 7,
  "terrain": [
    "######__",
    "#.---###",
    "#---.--#",
    "#---.--#",
    "#----###",
    "#-..-#__",
    "######__"
  ],
  "initialPlayer": {
    "x": 6,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 1
    },
    {
      "x": 5,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 4,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Starlight Stage 082",
    "concept": "practice staging-order",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,gi=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-83-staging-order-combine",
  "revision": 4,
  "width": 8,
  "height": 7,
  "terrain": [
    "########",
    "#....--#",
    "#---.--#",
    "#----###",
    "#----#__",
    "#----#__",
    "######__"
  ],
  "initialPlayer": {
    "x": 6,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 5,
      "y": 1
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 5,
      "y": 2
    },
    {
      "x": 1,
      "y": 4
    },
    {
      "x": 2,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Starlight Stage 083",
    "concept": "combine staging-order",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,_i=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-84-staging-order-test",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "####__",
    "#--###",
    "#----#",
    "#----#",
    "#---.#",
    "#.---#",
    "#...-#",
    "######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 1,
      "y": 3
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 4,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Starlight Stage 084",
    "concept": "test staging-order",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,vi=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-85-staging-order-recover",
  "revision": 4,
  "width": 9,
  "height": 6,
  "terrain": [
    "#########",
    "#-.-.---#",
    "#----.--#",
    "#-----###",
    "#----.#__",
    "#######__"
  ],
  "initialPlayer": {
    "x": 6,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 5,
      "y": 1
    },
    {
      "x": 5,
      "y": 2
    },
    {
      "x": 6,
      "y": 2
    },
    {
      "x": 2,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Starlight Stage 085",
    "concept": "staging-order recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,yi=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-86-staging-order-teach",
  "revision": 4,
  "width": 9,
  "height": 6,
  "terrain": [
    "#######__",
    "#.-...###",
    "#----.--#",
    "#-------#",
    "#-----###",
    "#######__"
  ],
  "initialPlayer": {
    "x": 7,
    "y": 2
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 6,
      "y": 2
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 6,
      "y": 3
    }
  ],
  "metadata": {
    "title": "Starlight Stage 086",
    "concept": "introduce staging-order",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,bi=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-87-staging-order-practice",
  "revision": 4,
  "width": 8,
  "height": 7,
  "terrain": [
    "########",
    "#--.-.-#",
    "#-----.#",
    "###---.#",
    "__#---.#",
    "__#----#",
    "__######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 1
    },
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 5,
      "y": 2
    }
  ],
  "metadata": {
    "title": "Starlight Stage 087",
    "concept": "practice staging-order",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,xi=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-88-staging-order-combine",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "######",
    "#-...#",
    "#----#",
    "#.---#",
    "#.---#",
    "#----#",
    "##--##",
    "_####_"
  ],
  "initialPlayer": {
    "x": 2,
    "y": 6
  },
  "initialBoxes": [
    {
      "x": 1,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 2,
      "y": 5
    },
    {
      "x": 3,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Starlight Stage 088",
    "concept": "combine staging-order",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Si=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-89-staging-order-test",
  "revision": 3,
  "width": 6,
  "height": 9,
  "terrain": [
    "######",
    "#-..-#",
    "#.--.#",
    "#----#",
    "#----#",
    "#.---#",
    "#--###",
    "#--#__",
    "####__"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 7
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 2,
      "y": 5
    },
    {
      "x": 1,
      "y": 6
    },
    {
      "x": 2,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Starlight Stage 089",
    "concept": "test staging-order",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Ci=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-90-staging-order-recover",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "_####_",
    "##--##",
    "#---.#",
    "#----#",
    "#----#",
    "#---.#",
    "#-..-#",
    "######"
  ],
  "initialPlayer": {
    "x": 2,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 3,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Starlight Stage 090",
    "concept": "staging-order recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,wi=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-91-congestion-teach",
  "revision": 4,
  "width": 7,
  "height": 8,
  "terrain": [
    "#######",
    "#-----#",
    "#-----#",
    "#-----#",
    "#.....#",
    "####--#",
    "___#--#",
    "___####"
  ],
  "initialPlayer": {
    "x": 4,
    "y": 6
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 4,
      "y": 4
    },
    {
      "x": 4,
      "y": 5
    },
    {
      "x": 5,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Cloud Junction 091",
    "concept": "introduce congestion",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Ti=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-92-congestion-practice",
  "revision": 4,
  "width": 7,
  "height": 7,
  "terrain": [
    "#######",
    "#-..--#",
    "#.----#",
    "#.---##",
    "#.---#_",
    "#----#_",
    "######_"
  ],
  "initialPlayer": {
    "x": 5,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 4,
      "y": 1
    },
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 2
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    }
  ],
  "metadata": {
    "title": "Cloud Junction 092",
    "concept": "practice congestion",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Ei=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-93-congestion-combine",
  "revision": 4,
  "width": 7,
  "height": 7,
  "terrain": [
    "######_",
    "#.-..#_",
    "#.--.#_",
    "#---.##",
    "#-----#",
    "#-----#",
    "#######"
  ],
  "initialPlayer": {
    "x": 5,
    "y": 4
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 1,
      "y": 4
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 4,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Cloud Junction 093",
    "concept": "combine congestion",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Di=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-94-congestion-test",
  "revision": 3,
  "width": 6,
  "height": 8,
  "terrain": [
    "######",
    "#----#",
    "#---.#",
    "#---.#",
    "#---.#",
    "#...-#",
    "###--#",
    "__####"
  ],
  "initialPlayer": {
    "x": 3,
    "y": 6
  },
  "initialBoxes": [
    {
      "x": 1,
      "y": 3
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 3,
      "y": 5
    },
    {
      "x": 4,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Cloud Junction 094",
    "concept": "test congestion",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Oi=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-95-congestion-recover",
  "revision": 4,
  "width": 7,
  "height": 8,
  "terrain": [
    "####___",
    "#--#___",
    "#--####",
    "#-..--#",
    "#.----#",
    "#.----#",
    "#.----#",
    "#######"
  ],
  "initialPlayer": {
    "x": 1,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 1,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 3,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Cloud Junction 095",
    "concept": "congestion recovery route",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,ki=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-96-congestion-teach",
  "revision": 4,
  "width": 9,
  "height": 6,
  "terrain": [
    "#######__",
    "#----.#__",
    "#----.###",
    "#-------#",
    "#-..-.--#",
    "#########"
  ],
  "initialPlayer": {
    "x": 6,
    "y": 3
  },
  "initialBoxes": [
    {
      "x": 3,
      "y": 1
    },
    {
      "x": 4,
      "y": 2
    },
    {
      "x": 4,
      "y": 3
    },
    {
      "x": 5,
      "y": 3
    },
    {
      "x": 6,
      "y": 4
    }
  ],
  "metadata": {
    "title": "Cloud Junction 096",
    "concept": "introduce congestion",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Ai=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-97-congestion-practice",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "######",
    "#-...#",
    "#----#",
    "#---.#",
    "#---.#",
    "#----#",
    "##--##",
    "_####_"
  ],
  "initialPlayer": {
    "x": 2,
    "y": 6
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 2,
      "y": 5
    },
    {
      "x": 3,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Cloud Junction 097",
    "concept": "practice congestion",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,ji=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-98-congestion-combine",
  "revision": 4,
  "width": 6,
  "height": 8,
  "terrain": [
    "######",
    "#-.--#",
    "#.--.#",
    "#----#",
    "#.---#",
    "#.--.#",
    "###--#",
    "__####"
  ],
  "initialPlayer": {
    "x": 3,
    "y": 6
  },
  "initialBoxes": [
    {
      "x": 1,
      "y": 3
    },
    {
      "x": 2,
      "y": 3
    },
    {
      "x": 2,
      "y": 4
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 3,
      "y": 5
    },
    {
      "x": 4,
      "y": 5
    }
  ],
  "metadata": {
    "title": "Cloud Junction 098",
    "concept": "combine congestion",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Mi=`{
  "schema": "g-sokoban/level",
  "version": 1,
  "ruleset": "sokoban/v1",
  "id": "sky-99-congestion-test",
  "revision": 3,
  "width": 6,
  "height": 8,
  "terrain": [
    "_####_",
    "_#--#_",
    "##--##",
    "#.---#",
    "#.---#",
    "#---.#",
    "#..-.#",
    "######"
  ],
  "initialPlayer": {
    "x": 2,
    "y": 1
  },
  "initialBoxes": [
    {
      "x": 2,
      "y": 2
    },
    {
      "x": 3,
      "y": 3
    },
    {
      "x": 3,
      "y": 4
    },
    {
      "x": 1,
      "y": 5
    },
    {
      "x": 2,
      "y": 5
    },
    {
      "x": 3,
      "y": 6
    }
  ],
  "metadata": {
    "title": "Cloud Junction 099",
    "concept": "test congestion",
    "author": "G Sokoban",
    "provenance": "original"
  }
}
`,Ni={up:{x:0,y:-1},right:{x:1,y:0},down:{x:0,y:1},left:{x:-1,y:0}};function Pi(e,t){return e.x===t.x&&e.y===t.y}function Fi(e,t){let n=Ni[t];return{x:e.x+n.x,y:e.y+n.y}}function Ii(e){return e.kind===`walk`?Object.freeze({kind:`walk`,direction:e.direction,playerFrom:S(e.playerFrom),playerTo:S(e.playerTo)}):Object.freeze({kind:`push`,direction:e.direction,playerFrom:S(e.playerFrom),playerTo:S(e.playerTo),boxFrom:S(e.boxFrom),boxTo:S(e.boxTo)})}function Li(e,t){return Object.freeze({state:e,events:Object.freeze([...t])})}function Ri(e,t,n){return Li(e,[Object.freeze({type:`move_blocked`,direction:t,reason:n})])}function zi(e,t){if(t.levelFingerprint!==E(e))throw Error(`Game state level fingerprint does not match the level.`)}function Bi(e,t){return zi(e,t),t.boxes.every(t=>T(e,t))?`won`:`playing`}function Vi(e,t,n){if(Bi(e,t)===`won`)return Ri(t,n,`level_complete`);let r=Fi(t.player,n),i=ae(e,r);if(i===`#`)return Ri(t,n,`wall`);if(i===void 0||i===`_`)return Ri(t,n,`void`);let a=t.boxes.findIndex(e=>Pi(e,r));if(a<0){let e=Ii({kind:`walk`,direction:n,playerFrom:t.player,playerTo:r});return Li(A({...t,player:r,moves:t.moves+1,undoStack:[...t.undoStack,e]}),[Object.freeze({type:`player_moved`,direction:n,from:S(t.player),to:S(r)})])}let o=Fi(r,n);if(!w(e,o)||t.boxes.some(e=>Pi(e,o)))return Ri(t,n,`box_blocked`);let s=[...t.boxes];s[a]=o;let c=Ii({kind:`push`,direction:n,playerFrom:t.player,playerTo:r,boxFrom:r,boxTo:o}),l=A({...t,player:r,boxes:s,moves:t.moves+1,pushes:t.pushes+1,undoStack:[...t.undoStack,c]}),u=[Object.freeze({type:`box_pushed`,direction:n,playerFrom:S(t.player),playerTo:S(r),boxFrom:S(r),boxTo:S(o)})];return Bi(e,l)===`won`&&u.push(Object.freeze({type:`level_won`,moves:l.moves,pushes:l.pushes})),Li(l,u)}function Hi(e){let t=e.undoStack.at(-1);if(t===void 0)return Li(e,[Object.freeze({type:`undo_unavailable`})]);let n=[...e.boxes];if(t.kind===`push`){let e=n.findIndex(e=>Pi(e,t.boxTo));if(e<0)throw Error(`Game state undo history does not match its box positions.`);n[e]=t.boxFrom}return Li(A({...e,player:t.playerFrom,boxes:n,moves:e.moves-1,pushes:e.pushes-+(t.kind===`push`),undoStack:e.undoStack.slice(0,-1)}),[Object.freeze({type:`move_undone`,reverted:Ii(t)})])}function Ui(e,t){let n=Object.freeze({type:`level_restarted`,previousMoves:t.moves,previousPushes:t.pushes,wasComplete:Bi(e,t)===`won`});return Li(me(e),[n])}function Wi(e,t,n){switch(zi(e,t),n.type){case`move`:return Vi(e,t,n.direction);case`undo`:return Hi(t);case`restart`:return Ui(e,t)}}Object.freeze([Object.freeze({x:0,y:-1}),Object.freeze({x:1,y:0}),Object.freeze({x:0,y:1}),Object.freeze({x:-1,y:0})]);function Gi(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}function Ki(e){if(!(!Gi(e)||!Number.isSafeInteger(e.position)||Number(e.position)<1||typeof e.levelId!=`string`||typeof e.levelPath!=`string`||!Number.isSafeInteger(e.optimalMoves)||Number(e.optimalMoves)<0||!Number.isSafeInteger(e.optimalPushes)||Number(e.optimalPushes)<0))return Object.freeze({position:Number(e.position),levelId:e.levelId,levelPath:e.levelPath,optimalMoves:Number(e.optimalMoves),optimalPushes:Number(e.optimalPushes)})}function qi(e){if(!Gi(e)||e.schema!==`g-sokoban/runtime-campaign`||e.version!==1||e.campaignId!==`main`||!Array.isArray(e.entries))throw Error(`Runtime campaign index header is invalid.`);let t=e.entries.map(Ki);if(t.some(e=>e===void 0))throw Error(`Runtime campaign index contains an invalid entry.`);return Object.freeze({schema:`g-sokoban/runtime-campaign`,version:1,campaignId:`main`,entries:Object.freeze(t)})}var Ji=new Set([`curated-reverse-pull`,`curated-reverse-bfs`,`curated-pocket-room`]),Yi=new Set([`reverse-pull/mulberry32-v1`,`reverse-pull/mulberry32-v2`,`reverse-bfs/mulberry32-v3`,`pocket-room/mulberry32-v5`]),Xi=new Set([`teach`,`practice`,`combine`,`test`,`recover`]),Zi=new Set([`single-box-routing`,`corner-safety`,`box-order`,`staging-order`,`counterintuitive-push`,`path-congestion`,`multi-box-dependency`,`mixed-mastery`,`multi-box-synthesis`,`recovery`]);function Qi(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}function $i(e){if(Qi(e)&&Number.isInteger(e.position)&&Number.isInteger(e.wave)&&Xi.has(e.role)&&typeof e.concept==`string`&&Zi.has(e.conceptTag)&&typeof e.levelId==`string`&&typeof e.levelPath==`string`&&typeof e.evidencePath==`string`&&Qi(e.source)&&Ji.has(e.source.method)&&Yi.has(e.source.generatorVersion)&&Number.isInteger(e.source.seed))return Object.freeze({position:Number(e.position),wave:Number(e.wave),role:e.role,concept:e.concept,conceptTag:e.conceptTag,levelId:e.levelId,levelPath:e.levelPath,evidencePath:e.evidencePath,source:Object.freeze({method:e.source.method,generatorVersion:e.source.generatorVersion,seed:Number(e.source.seed)})})}function ea(e){if(!Qi(e)||e.schema!==`g-sokoban/campaign`||e.version!==2||e.id!==`main`||e.solverBudget!==1e5||e.solverVersion!==`push-bfs/v1`||e.witnessBudget!==1e6||e.witnessVersion!==`push-move-lex-dijkstra/v1`||e.difficultyModelVersion!==`canonical-witness-weighted/v3`||e.calibration!==`uncalibrated`||!Array.isArray(e.entries))throw Error(`Campaign manifest header is invalid.`);let t=e.entries.map($i);if(t.some(e=>e===void 0))throw Error(`Campaign manifest contains an invalid entry.`);return Object.freeze({schema:`g-sokoban/campaign`,version:2,id:`main`,solverBudget:1e5,solverVersion:`push-bfs/v1`,witnessBudget:1e6,witnessVersion:`push-move-lex-dijkstra/v1`,difficultyModelVersion:`canonical-witness-weighted/v3`,calibration:`uncalibrated`,entries:Object.freeze(t)})}var ta=`{
  "schema": "g-sokoban/campaign",
  "version": 2,
  "id": "main",
  "solverBudget": 100000,
  "solverVersion": "push-bfs/v1",
  "witnessBudget": 1000000,
  "witnessVersion": "push-move-lex-dijkstra/v1",
  "difficultyModelVersion": "canonical-witness-weighted/v3",
  "calibration": "uncalibrated",
  "entries": [
    {
      "position": 1,
      "wave": 1,
      "role": "teach",
      "concept": "push toward a visible goal",
      "conceptTag": "single-box-routing",
      "levelId": "sky-01-first-light",
      "levelPath": "levels/campaign/sky-01-first-light.level.json",
      "evidencePath": "levels/evidence/sky-01-first-light.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 100007
      }
    },
    {
      "position": 2,
      "wave": 1,
      "role": "practice",
      "concept": "walk behind a box",
      "conceptTag": "single-box-routing",
      "levelId": "sky-02-step-around",
      "levelPath": "levels/campaign/sky-02-step-around.level.json",
      "evidencePath": "levels/evidence/sky-02-step-around.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 100001
      }
    },
    {
      "position": 3,
      "wave": 1,
      "role": "combine",
      "concept": "change push direction",
      "conceptTag": "single-box-routing",
      "levelId": "sky-03-turning-lane",
      "levelPath": "levels/campaign/sky-03-turning-lane.level.json",
      "evidencePath": "levels/evidence/sky-03-turning-lane.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 100025
      }
    },
    {
      "position": 4,
      "wave": 1,
      "role": "test",
      "concept": "choose the goal entry side",
      "conceptTag": "single-box-routing",
      "levelId": "sky-04-entry-test",
      "levelPath": "levels/campaign/sky-04-entry-test.level.json",
      "evidencePath": "levels/evidence/sky-04-entry-test.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 100006
      }
    },
    {
      "position": 5,
      "wave": 1,
      "role": "recover",
      "concept": "one-box recovery",
      "conceptTag": "recovery",
      "levelId": "sky-05-clear-sky",
      "levelPath": "levels/campaign/sky-05-clear-sky.level.json",
      "evidencePath": "levels/evidence/sky-05-clear-sky.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 100014
      }
    },
    {
      "position": 6,
      "wave": 2,
      "role": "teach",
      "concept": "recognize unsafe corners",
      "conceptTag": "corner-safety",
      "levelId": "sky-06-corner-warning",
      "levelPath": "levels/campaign/sky-06-corner-warning.level.json",
      "evidencePath": "levels/evidence/sky-06-corner-warning.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 200021
      }
    },
    {
      "position": 7,
      "wave": 2,
      "role": "practice",
      "concept": "route behind the box",
      "conceptTag": "corner-safety",
      "levelId": "sky-07-back-route",
      "levelPath": "levels/campaign/sky-07-back-route.level.json",
      "evidencePath": "levels/evidence/sky-07-back-route.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 200012
      }
    },
    {
      "position": 8,
      "wave": 2,
      "role": "combine",
      "concept": "combine corner safety and approach",
      "conceptTag": "corner-safety",
      "levelId": "sky-08-safe-approach",
      "levelPath": "levels/campaign/sky-08-safe-approach.level.json",
      "evidencePath": "levels/evidence/sky-08-safe-approach.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 200018
      }
    },
    {
      "position": 9,
      "wave": 2,
      "role": "test",
      "concept": "navigate around internal walls",
      "conceptTag": "corner-safety",
      "levelId": "sky-09-wall-orbit",
      "levelPath": "levels/campaign/sky-09-wall-orbit.level.json",
      "evidencePath": "levels/evidence/sky-09-wall-orbit.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 200020
      }
    },
    {
      "position": 10,
      "wave": 2,
      "role": "recover",
      "concept": "safe-route recovery",
      "conceptTag": "recovery",
      "levelId": "sky-10-soft-landing",
      "levelPath": "levels/campaign/sky-10-soft-landing.level.json",
      "evidencePath": "levels/evidence/sky-10-soft-landing.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 200003
      }
    },
    {
      "position": 11,
      "wave": 3,
      "role": "teach",
      "concept": "introduce two boxes",
      "conceptTag": "box-order",
      "levelId": "sky-11-two-stars",
      "levelPath": "levels/campaign/sky-11-two-stars.level.json",
      "evidencePath": "levels/evidence/sky-11-two-stars.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 300021
      }
    },
    {
      "position": 12,
      "wave": 3,
      "role": "practice",
      "concept": "switch between boxes",
      "conceptTag": "box-order",
      "levelId": "sky-12-shift-change",
      "levelPath": "levels/campaign/sky-12-shift-change.level.json",
      "evidencePath": "levels/evidence/sky-12-shift-change.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 300001
      }
    },
    {
      "position": 13,
      "wave": 3,
      "role": "combine",
      "concept": "combine routing and box order",
      "conceptTag": "box-order",
      "levelId": "sky-13-order-lanes",
      "levelPath": "levels/campaign/sky-13-order-lanes.level.json",
      "evidencePath": "levels/evidence/sky-13-order-lanes.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 300008
      }
    },
    {
      "position": 14,
      "wave": 3,
      "role": "test",
      "concept": "sequence two box routes",
      "conceptTag": "box-order",
      "levelId": "sky-14-relay-test",
      "levelPath": "levels/campaign/sky-14-relay-test.level.json",
      "evidencePath": "levels/evidence/sky-14-relay-test.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 300017
      }
    },
    {
      "position": 15,
      "wave": 3,
      "role": "recover",
      "concept": "two-box recovery",
      "conceptTag": "recovery",
      "levelId": "sky-15-twin-rest",
      "levelPath": "levels/campaign/sky-15-twin-rest.level.json",
      "evidencePath": "levels/evidence/sky-15-twin-rest.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 300024
      }
    },
    {
      "position": 16,
      "wave": 4,
      "role": "teach",
      "concept": "first counterintuitive push",
      "conceptTag": "counterintuitive-push",
      "levelId": "sky-16-step-away",
      "levelPath": "levels/campaign/sky-16-step-away.level.json",
      "evidencePath": "levels/evidence/sky-16-step-away.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 401630
      }
    },
    {
      "position": 17,
      "wave": 4,
      "role": "practice",
      "concept": "move away before approaching",
      "conceptTag": "counterintuitive-push",
      "levelId": "sky-17-long-arc",
      "levelPath": "levels/campaign/sky-17-long-arc.level.json",
      "evidencePath": "levels/evidence/sky-17-long-arc.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 400190
      }
    },
    {
      "position": 18,
      "wave": 4,
      "role": "combine",
      "concept": "combine reversal and box order",
      "conceptTag": "counterintuitive-push",
      "levelId": "sky-18-cross-current",
      "levelPath": "levels/campaign/sky-18-cross-current.level.json",
      "evidencePath": "levels/evidence/sky-18-cross-current.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 400508
      }
    },
    {
      "position": 19,
      "wave": 4,
      "role": "test",
      "concept": "test multiple counterintuitive pushes",
      "conceptTag": "counterintuitive-push",
      "levelId": "sky-19-retrograde",
      "levelPath": "levels/campaign/sky-19-retrograde.level.json",
      "evidencePath": "levels/evidence/sky-19-retrograde.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 402118
      }
    },
    {
      "position": 20,
      "wave": 4,
      "role": "recover",
      "concept": "counterintuitive recovery",
      "conceptTag": "recovery",
      "levelId": "sky-20-homeward",
      "levelPath": "levels/campaign/sky-20-homeward.level.json",
      "evidencePath": "levels/evidence/sky-20-homeward.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 401633
      }
    },
    {
      "position": 21,
      "wave": 5,
      "role": "teach",
      "concept": "introduce shared box paths",
      "conceptTag": "path-congestion",
      "levelId": "sky-21-shared-lane",
      "levelPath": "levels/campaign/sky-21-shared-lane.level.json",
      "evidencePath": "levels/evidence/sky-21-shared-lane.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 500251
      }
    },
    {
      "position": 22,
      "wave": 5,
      "role": "practice",
      "concept": "practice path congestion",
      "conceptTag": "path-congestion",
      "levelId": "sky-22-traffic-flow",
      "levelPath": "levels/campaign/sky-22-traffic-flow.level.json",
      "evidencePath": "levels/evidence/sky-22-traffic-flow.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 500051
      }
    },
    {
      "position": 23,
      "wave": 5,
      "role": "combine",
      "concept": "combine congestion and switching",
      "conceptTag": "path-congestion",
      "levelId": "sky-23-switchyard",
      "levelPath": "levels/campaign/sky-23-switchyard.level.json",
      "evidencePath": "levels/evidence/sky-23-switchyard.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 500275
      }
    },
    {
      "position": 24,
      "wave": 5,
      "role": "test",
      "concept": "test congested routing",
      "conceptTag": "path-congestion",
      "levelId": "sky-24-busy-orbit",
      "levelPath": "levels/campaign/sky-24-busy-orbit.level.json",
      "evidencePath": "levels/evidence/sky-24-busy-orbit.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 500019
      }
    },
    {
      "position": 25,
      "wave": 5,
      "role": "recover",
      "concept": "congestion recovery",
      "conceptTag": "recovery",
      "levelId": "sky-25-open-channel",
      "levelPath": "levels/campaign/sky-25-open-channel.level.json",
      "evidencePath": "levels/evidence/sky-25-open-channel.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 500171
      }
    },
    {
      "position": 26,
      "wave": 6,
      "role": "teach",
      "concept": "introduce three-box coordination",
      "conceptTag": "multi-box-synthesis",
      "levelId": "sky-26-linked-stars",
      "levelPath": "levels/campaign/sky-26-linked-stars.level.json",
      "evidencePath": "levels/evidence/sky-26-linked-stars.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 500343
      }
    },
    {
      "position": 27,
      "wave": 6,
      "role": "practice",
      "concept": "practice longer three-box sequencing",
      "conceptTag": "multi-box-synthesis",
      "levelId": "sky-27-dependency-chain",
      "levelPath": "levels/campaign/sky-27-dependency-chain.level.json",
      "evidencePath": "levels/evidence/sky-27-dependency-chain.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 600019
      }
    },
    {
      "position": 28,
      "wave": 6,
      "role": "combine",
      "concept": "combine box switching and route overlap",
      "conceptTag": "multi-box-synthesis",
      "levelId": "sky-28-night-shift",
      "levelPath": "levels/campaign/sky-28-night-shift.level.json",
      "evidencePath": "levels/evidence/sky-28-night-shift.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 600154
      }
    },
    {
      "position": 29,
      "wave": 6,
      "role": "test",
      "concept": "test extended three-box synthesis",
      "conceptTag": "multi-box-synthesis",
      "levelId": "sky-29-grand-observatory",
      "levelPath": "levels/campaign/sky-29-grand-observatory.level.json",
      "evidencePath": "levels/evidence/sky-29-grand-observatory.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 600155
      }
    },
    {
      "position": 30,
      "wave": 6,
      "role": "recover",
      "concept": "three-box recovery",
      "conceptTag": "recovery",
      "levelId": "sky-30-dawn-return",
      "levelPath": "levels/campaign/sky-30-dawn-return.level.json",
      "evidencePath": "levels/evidence/sky-30-dawn-return.evidence.json",
      "source": {
        "method": "curated-reverse-pull",
        "generatorVersion": "reverse-pull/mulberry32-v1",
        "seed": 600156
      }
    },
    {
      "position": 31,
      "wave": 7,
      "role": "teach",
      "concept": "introduce sequencing",
      "conceptTag": "box-order",
      "levelId": "sky-31-sequencing-teach",
      "levelPath": "levels/campaign/sky-31-sequencing-teach.level.json",
      "evidencePath": "levels/evidence/sky-31-sequencing-teach.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20031016
      }
    },
    {
      "position": 32,
      "wave": 7,
      "role": "practice",
      "concept": "practice sequencing",
      "conceptTag": "box-order",
      "levelId": "sky-32-sequencing-practice",
      "levelPath": "levels/campaign/sky-32-sequencing-practice.level.json",
      "evidencePath": "levels/evidence/sky-32-sequencing-practice.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20032001
      }
    },
    {
      "position": 33,
      "wave": 7,
      "role": "combine",
      "concept": "combine sequencing",
      "conceptTag": "box-order",
      "levelId": "sky-33-sequencing-combine",
      "levelPath": "levels/campaign/sky-33-sequencing-combine.level.json",
      "evidencePath": "levels/evidence/sky-33-sequencing-combine.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20033040
      }
    },
    {
      "position": 34,
      "wave": 7,
      "role": "test",
      "concept": "test sequencing",
      "conceptTag": "box-order",
      "levelId": "sky-34-sequencing-test",
      "levelPath": "levels/campaign/sky-34-sequencing-test.level.json",
      "evidencePath": "levels/evidence/sky-34-sequencing-test.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20034029
      }
    },
    {
      "position": 35,
      "wave": 7,
      "role": "recover",
      "concept": "sequencing recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-35-sequencing-recover",
      "levelPath": "levels/campaign/sky-35-sequencing-recover.level.json",
      "evidencePath": "levels/evidence/sky-35-sequencing-recover.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20035037
      }
    },
    {
      "position": 36,
      "wave": 8,
      "role": "teach",
      "concept": "introduce sequencing",
      "conceptTag": "box-order",
      "levelId": "sky-36-sequencing-teach",
      "levelPath": "levels/campaign/sky-36-sequencing-teach.level.json",
      "evidencePath": "levels/evidence/sky-36-sequencing-teach.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20036007
      }
    },
    {
      "position": 37,
      "wave": 8,
      "role": "practice",
      "concept": "practice sequencing",
      "conceptTag": "box-order",
      "levelId": "sky-37-sequencing-practice",
      "levelPath": "levels/campaign/sky-37-sequencing-practice.level.json",
      "evidencePath": "levels/evidence/sky-37-sequencing-practice.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20037010
      }
    },
    {
      "position": 38,
      "wave": 8,
      "role": "combine",
      "concept": "combine sequencing",
      "conceptTag": "box-order",
      "levelId": "sky-38-sequencing-combine",
      "levelPath": "levels/campaign/sky-38-sequencing-combine.level.json",
      "evidencePath": "levels/evidence/sky-38-sequencing-combine.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20038028
      }
    },
    {
      "position": 39,
      "wave": 8,
      "role": "test",
      "concept": "test sequencing",
      "conceptTag": "box-order",
      "levelId": "sky-39-sequencing-test",
      "levelPath": "levels/campaign/sky-39-sequencing-test.level.json",
      "evidencePath": "levels/evidence/sky-39-sequencing-test.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20039001
      }
    },
    {
      "position": 40,
      "wave": 8,
      "role": "recover",
      "concept": "sequencing recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-40-sequencing-recover",
      "levelPath": "levels/campaign/sky-40-sequencing-recover.level.json",
      "evidencePath": "levels/evidence/sky-40-sequencing-recover.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20040013
      }
    },
    {
      "position": 41,
      "wave": 9,
      "role": "teach",
      "concept": "introduce sequencing",
      "conceptTag": "box-order",
      "levelId": "sky-41-sequencing-teach",
      "levelPath": "levels/campaign/sky-41-sequencing-teach.level.json",
      "evidencePath": "levels/evidence/sky-41-sequencing-teach.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20041046
      }
    },
    {
      "position": 42,
      "wave": 9,
      "role": "practice",
      "concept": "practice sequencing",
      "conceptTag": "box-order",
      "levelId": "sky-42-sequencing-practice",
      "levelPath": "levels/campaign/sky-42-sequencing-practice.level.json",
      "evidencePath": "levels/evidence/sky-42-sequencing-practice.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20042022
      }
    },
    {
      "position": 43,
      "wave": 9,
      "role": "combine",
      "concept": "combine sequencing",
      "conceptTag": "box-order",
      "levelId": "sky-43-sequencing-combine",
      "levelPath": "levels/campaign/sky-43-sequencing-combine.level.json",
      "evidencePath": "levels/evidence/sky-43-sequencing-combine.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20043031
      }
    },
    {
      "position": 44,
      "wave": 9,
      "role": "test",
      "concept": "test sequencing",
      "conceptTag": "box-order",
      "levelId": "sky-44-sequencing-test",
      "levelPath": "levels/campaign/sky-44-sequencing-test.level.json",
      "evidencePath": "levels/evidence/sky-44-sequencing-test.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20044034
      }
    },
    {
      "position": 45,
      "wave": 9,
      "role": "recover",
      "concept": "sequencing recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-45-sequencing-recover",
      "levelPath": "levels/campaign/sky-45-sequencing-recover.level.json",
      "evidencePath": "levels/evidence/sky-45-sequencing-recover.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20045022
      }
    },
    {
      "position": 46,
      "wave": 10,
      "role": "teach",
      "concept": "introduce sequencing",
      "conceptTag": "box-order",
      "levelId": "sky-46-sequencing-teach",
      "levelPath": "levels/campaign/sky-46-sequencing-teach.level.json",
      "evidencePath": "levels/evidence/sky-46-sequencing-teach.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20046007
      }
    },
    {
      "position": 47,
      "wave": 10,
      "role": "practice",
      "concept": "practice sequencing",
      "conceptTag": "box-order",
      "levelId": "sky-47-sequencing-practice",
      "levelPath": "levels/campaign/sky-47-sequencing-practice.level.json",
      "evidencePath": "levels/evidence/sky-47-sequencing-practice.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20047047
      }
    },
    {
      "position": 48,
      "wave": 10,
      "role": "combine",
      "concept": "combine sequencing",
      "conceptTag": "box-order",
      "levelId": "sky-48-sequencing-combine",
      "levelPath": "levels/campaign/sky-48-sequencing-combine.level.json",
      "evidencePath": "levels/evidence/sky-48-sequencing-combine.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20048020
      }
    },
    {
      "position": 49,
      "wave": 10,
      "role": "test",
      "concept": "test sequencing",
      "conceptTag": "box-order",
      "levelId": "sky-49-sequencing-test",
      "levelPath": "levels/campaign/sky-49-sequencing-test.level.json",
      "evidencePath": "levels/evidence/sky-49-sequencing-test.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20049001
      }
    },
    {
      "position": 50,
      "wave": 10,
      "role": "recover",
      "concept": "sequencing recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-50-sequencing-recover",
      "levelPath": "levels/campaign/sky-50-sequencing-recover.level.json",
      "evidencePath": "levels/evidence/sky-50-sequencing-recover.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20050019
      }
    },
    {
      "position": 51,
      "wave": 11,
      "role": "teach",
      "concept": "introduce sequencing",
      "conceptTag": "box-order",
      "levelId": "sky-51-sequencing-teach",
      "levelPath": "levels/campaign/sky-51-sequencing-teach.level.json",
      "evidencePath": "levels/evidence/sky-51-sequencing-teach.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20051043
      }
    },
    {
      "position": 52,
      "wave": 11,
      "role": "practice",
      "concept": "practice sequencing",
      "conceptTag": "box-order",
      "levelId": "sky-52-sequencing-practice",
      "levelPath": "levels/campaign/sky-52-sequencing-practice.level.json",
      "evidencePath": "levels/evidence/sky-52-sequencing-practice.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20052013
      }
    },
    {
      "position": 53,
      "wave": 11,
      "role": "combine",
      "concept": "combine sequencing",
      "conceptTag": "box-order",
      "levelId": "sky-53-sequencing-combine",
      "levelPath": "levels/campaign/sky-53-sequencing-combine.level.json",
      "evidencePath": "levels/evidence/sky-53-sequencing-combine.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20053004
      }
    },
    {
      "position": 54,
      "wave": 11,
      "role": "test",
      "concept": "test sequencing",
      "conceptTag": "box-order",
      "levelId": "sky-54-sequencing-test",
      "levelPath": "levels/campaign/sky-54-sequencing-test.level.json",
      "evidencePath": "levels/evidence/sky-54-sequencing-test.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20054033
      }
    },
    {
      "position": 55,
      "wave": 11,
      "role": "recover",
      "concept": "sequencing recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-55-sequencing-recover",
      "levelPath": "levels/campaign/sky-55-sequencing-recover.level.json",
      "evidencePath": "levels/evidence/sky-55-sequencing-recover.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20055022
      }
    },
    {
      "position": 56,
      "wave": 12,
      "role": "teach",
      "concept": "introduce sequencing",
      "conceptTag": "box-order",
      "levelId": "sky-56-sequencing-teach",
      "levelPath": "levels/campaign/sky-56-sequencing-teach.level.json",
      "evidencePath": "levels/evidence/sky-56-sequencing-teach.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20056019
      }
    },
    {
      "position": 57,
      "wave": 12,
      "role": "practice",
      "concept": "practice sequencing",
      "conceptTag": "box-order",
      "levelId": "sky-57-sequencing-practice",
      "levelPath": "levels/campaign/sky-57-sequencing-practice.level.json",
      "evidencePath": "levels/evidence/sky-57-sequencing-practice.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20057019
      }
    },
    {
      "position": 58,
      "wave": 12,
      "role": "combine",
      "concept": "combine sequencing",
      "conceptTag": "box-order",
      "levelId": "sky-58-sequencing-combine",
      "levelPath": "levels/campaign/sky-58-sequencing-combine.level.json",
      "evidencePath": "levels/evidence/sky-58-sequencing-combine.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20058013
      }
    },
    {
      "position": 59,
      "wave": 12,
      "role": "test",
      "concept": "test sequencing",
      "conceptTag": "box-order",
      "levelId": "sky-59-sequencing-test",
      "levelPath": "levels/campaign/sky-59-sequencing-test.level.json",
      "evidencePath": "levels/evidence/sky-59-sequencing-test.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20059022
      }
    },
    {
      "position": 60,
      "wave": 12,
      "role": "recover",
      "concept": "sequencing recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-60-sequencing-recover",
      "levelPath": "levels/campaign/sky-60-sequencing-recover.level.json",
      "evidencePath": "levels/evidence/sky-60-sequencing-recover.evidence.json",
      "source": {
        "method": "curated-reverse-bfs",
        "generatorVersion": "reverse-bfs/mulberry32-v3",
        "seed": 20060022
      }
    },
    {
      "position": 61,
      "wave": 13,
      "role": "teach",
      "concept": "introduce staging-order",
      "conceptTag": "staging-order",
      "levelId": "sky-61-staging-order-teach",
      "levelPath": "levels/campaign/sky-61-staging-order-teach.level.json",
      "evidencePath": "levels/evidence/sky-61-staging-order-teach.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50061008
      }
    },
    {
      "position": 62,
      "wave": 13,
      "role": "practice",
      "concept": "practice staging-order",
      "conceptTag": "staging-order",
      "levelId": "sky-62-staging-order-practice",
      "levelPath": "levels/campaign/sky-62-staging-order-practice.level.json",
      "evidencePath": "levels/evidence/sky-62-staging-order-practice.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50062031
      }
    },
    {
      "position": 63,
      "wave": 13,
      "role": "combine",
      "concept": "combine staging-order",
      "conceptTag": "staging-order",
      "levelId": "sky-63-staging-order-combine",
      "levelPath": "levels/campaign/sky-63-staging-order-combine.level.json",
      "evidencePath": "levels/evidence/sky-63-staging-order-combine.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50063014
      }
    },
    {
      "position": 64,
      "wave": 13,
      "role": "test",
      "concept": "test staging-order",
      "conceptTag": "staging-order",
      "levelId": "sky-64-staging-order-test",
      "levelPath": "levels/campaign/sky-64-staging-order-test.level.json",
      "evidencePath": "levels/evidence/sky-64-staging-order-test.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50064031
      }
    },
    {
      "position": 65,
      "wave": 13,
      "role": "recover",
      "concept": "staging-order recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-65-staging-order-recover",
      "levelPath": "levels/campaign/sky-65-staging-order-recover.level.json",
      "evidencePath": "levels/evidence/sky-65-staging-order-recover.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50065027
      }
    },
    {
      "position": 66,
      "wave": 14,
      "role": "teach",
      "concept": "introduce staging-order",
      "conceptTag": "staging-order",
      "levelId": "sky-66-staging-order-teach",
      "levelPath": "levels/campaign/sky-66-staging-order-teach.level.json",
      "evidencePath": "levels/evidence/sky-66-staging-order-teach.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50066017
      }
    },
    {
      "position": 67,
      "wave": 14,
      "role": "practice",
      "concept": "practice staging-order",
      "conceptTag": "staging-order",
      "levelId": "sky-67-staging-order-practice",
      "levelPath": "levels/campaign/sky-67-staging-order-practice.level.json",
      "evidencePath": "levels/evidence/sky-67-staging-order-practice.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50067025
      }
    },
    {
      "position": 68,
      "wave": 14,
      "role": "combine",
      "concept": "combine staging-order",
      "conceptTag": "staging-order",
      "levelId": "sky-68-staging-order-combine",
      "levelPath": "levels/campaign/sky-68-staging-order-combine.level.json",
      "evidencePath": "levels/evidence/sky-68-staging-order-combine.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50068032
      }
    },
    {
      "position": 69,
      "wave": 14,
      "role": "test",
      "concept": "test staging-order",
      "conceptTag": "staging-order",
      "levelId": "sky-69-staging-order-test",
      "levelPath": "levels/campaign/sky-69-staging-order-test.level.json",
      "evidencePath": "levels/evidence/sky-69-staging-order-test.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50069001
      }
    },
    {
      "position": 70,
      "wave": 14,
      "role": "recover",
      "concept": "staging-order recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-70-staging-order-recover",
      "levelPath": "levels/campaign/sky-70-staging-order-recover.level.json",
      "evidencePath": "levels/evidence/sky-70-staging-order-recover.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50070025
      }
    },
    {
      "position": 71,
      "wave": 15,
      "role": "teach",
      "concept": "introduce staging-order",
      "conceptTag": "staging-order",
      "levelId": "sky-71-staging-order-teach",
      "levelPath": "levels/campaign/sky-71-staging-order-teach.level.json",
      "evidencePath": "levels/evidence/sky-71-staging-order-teach.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50071025
      }
    },
    {
      "position": 72,
      "wave": 15,
      "role": "practice",
      "concept": "practice staging-order",
      "conceptTag": "staging-order",
      "levelId": "sky-72-staging-order-practice",
      "levelPath": "levels/campaign/sky-72-staging-order-practice.level.json",
      "evidencePath": "levels/evidence/sky-72-staging-order-practice.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50072034
      }
    },
    {
      "position": 73,
      "wave": 15,
      "role": "combine",
      "concept": "combine staging-order",
      "conceptTag": "staging-order",
      "levelId": "sky-73-staging-order-combine",
      "levelPath": "levels/campaign/sky-73-staging-order-combine.level.json",
      "evidencePath": "levels/evidence/sky-73-staging-order-combine.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50073012
      }
    },
    {
      "position": 74,
      "wave": 15,
      "role": "test",
      "concept": "test staging-order",
      "conceptTag": "staging-order",
      "levelId": "sky-74-staging-order-test",
      "levelPath": "levels/campaign/sky-74-staging-order-test.level.json",
      "evidencePath": "levels/evidence/sky-74-staging-order-test.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50074023
      }
    },
    {
      "position": 75,
      "wave": 15,
      "role": "recover",
      "concept": "staging-order recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-75-staging-order-recover",
      "levelPath": "levels/campaign/sky-75-staging-order-recover.level.json",
      "evidencePath": "levels/evidence/sky-75-staging-order-recover.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50075002
      }
    },
    {
      "position": 76,
      "wave": 16,
      "role": "teach",
      "concept": "introduce staging-order",
      "conceptTag": "staging-order",
      "levelId": "sky-76-staging-order-teach",
      "levelPath": "levels/campaign/sky-76-staging-order-teach.level.json",
      "evidencePath": "levels/evidence/sky-76-staging-order-teach.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50076033
      }
    },
    {
      "position": 77,
      "wave": 16,
      "role": "practice",
      "concept": "practice staging-order",
      "conceptTag": "staging-order",
      "levelId": "sky-77-staging-order-practice",
      "levelPath": "levels/campaign/sky-77-staging-order-practice.level.json",
      "evidencePath": "levels/evidence/sky-77-staging-order-practice.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50077017
      }
    },
    {
      "position": 78,
      "wave": 16,
      "role": "combine",
      "concept": "combine staging-order",
      "conceptTag": "staging-order",
      "levelId": "sky-78-staging-order-combine",
      "levelPath": "levels/campaign/sky-78-staging-order-combine.level.json",
      "evidencePath": "levels/evidence/sky-78-staging-order-combine.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50078001
      }
    },
    {
      "position": 79,
      "wave": 16,
      "role": "test",
      "concept": "test staging-order",
      "conceptTag": "staging-order",
      "levelId": "sky-79-staging-order-test",
      "levelPath": "levels/campaign/sky-79-staging-order-test.level.json",
      "evidencePath": "levels/evidence/sky-79-staging-order-test.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50079013
      }
    },
    {
      "position": 80,
      "wave": 16,
      "role": "recover",
      "concept": "staging-order recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-80-staging-order-recover",
      "levelPath": "levels/campaign/sky-80-staging-order-recover.level.json",
      "evidencePath": "levels/evidence/sky-80-staging-order-recover.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50080018
      }
    },
    {
      "position": 81,
      "wave": 17,
      "role": "teach",
      "concept": "introduce staging-order",
      "conceptTag": "staging-order",
      "levelId": "sky-81-staging-order-teach",
      "levelPath": "levels/campaign/sky-81-staging-order-teach.level.json",
      "evidencePath": "levels/evidence/sky-81-staging-order-teach.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50081029
      }
    },
    {
      "position": 82,
      "wave": 17,
      "role": "practice",
      "concept": "practice staging-order",
      "conceptTag": "staging-order",
      "levelId": "sky-82-staging-order-practice",
      "levelPath": "levels/campaign/sky-82-staging-order-practice.level.json",
      "evidencePath": "levels/evidence/sky-82-staging-order-practice.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50082005
      }
    },
    {
      "position": 83,
      "wave": 17,
      "role": "combine",
      "concept": "combine staging-order",
      "conceptTag": "staging-order",
      "levelId": "sky-83-staging-order-combine",
      "levelPath": "levels/campaign/sky-83-staging-order-combine.level.json",
      "evidencePath": "levels/evidence/sky-83-staging-order-combine.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50083023
      }
    },
    {
      "position": 84,
      "wave": 17,
      "role": "test",
      "concept": "test staging-order",
      "conceptTag": "staging-order",
      "levelId": "sky-84-staging-order-test",
      "levelPath": "levels/campaign/sky-84-staging-order-test.level.json",
      "evidencePath": "levels/evidence/sky-84-staging-order-test.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50084031
      }
    },
    {
      "position": 85,
      "wave": 17,
      "role": "recover",
      "concept": "staging-order recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-85-staging-order-recover",
      "levelPath": "levels/campaign/sky-85-staging-order-recover.level.json",
      "evidencePath": "levels/evidence/sky-85-staging-order-recover.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50085010
      }
    },
    {
      "position": 86,
      "wave": 18,
      "role": "teach",
      "concept": "introduce staging-order",
      "conceptTag": "staging-order",
      "levelId": "sky-86-staging-order-teach",
      "levelPath": "levels/campaign/sky-86-staging-order-teach.level.json",
      "evidencePath": "levels/evidence/sky-86-staging-order-teach.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50086030
      }
    },
    {
      "position": 87,
      "wave": 18,
      "role": "practice",
      "concept": "practice staging-order",
      "conceptTag": "staging-order",
      "levelId": "sky-87-staging-order-practice",
      "levelPath": "levels/campaign/sky-87-staging-order-practice.level.json",
      "evidencePath": "levels/evidence/sky-87-staging-order-practice.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50087002
      }
    },
    {
      "position": 88,
      "wave": 18,
      "role": "combine",
      "concept": "combine staging-order",
      "conceptTag": "staging-order",
      "levelId": "sky-88-staging-order-combine",
      "levelPath": "levels/campaign/sky-88-staging-order-combine.level.json",
      "evidencePath": "levels/evidence/sky-88-staging-order-combine.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50088004
      }
    },
    {
      "position": 89,
      "wave": 18,
      "role": "test",
      "concept": "test staging-order",
      "conceptTag": "staging-order",
      "levelId": "sky-89-staging-order-test",
      "levelPath": "levels/campaign/sky-89-staging-order-test.level.json",
      "evidencePath": "levels/evidence/sky-89-staging-order-test.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50089032
      }
    },
    {
      "position": 90,
      "wave": 18,
      "role": "recover",
      "concept": "staging-order recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-90-staging-order-recover",
      "levelPath": "levels/campaign/sky-90-staging-order-recover.level.json",
      "evidencePath": "levels/evidence/sky-90-staging-order-recover.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50090027
      }
    },
    {
      "position": 91,
      "wave": 19,
      "role": "teach",
      "concept": "introduce congestion",
      "conceptTag": "path-congestion",
      "levelId": "sky-91-congestion-teach",
      "levelPath": "levels/campaign/sky-91-congestion-teach.level.json",
      "evidencePath": "levels/evidence/sky-91-congestion-teach.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50091035
      }
    },
    {
      "position": 92,
      "wave": 19,
      "role": "practice",
      "concept": "practice congestion",
      "conceptTag": "path-congestion",
      "levelId": "sky-92-congestion-practice",
      "levelPath": "levels/campaign/sky-92-congestion-practice.level.json",
      "evidencePath": "levels/evidence/sky-92-congestion-practice.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50092006
      }
    },
    {
      "position": 93,
      "wave": 19,
      "role": "combine",
      "concept": "combine congestion",
      "conceptTag": "path-congestion",
      "levelId": "sky-93-congestion-combine",
      "levelPath": "levels/campaign/sky-93-congestion-combine.level.json",
      "evidencePath": "levels/evidence/sky-93-congestion-combine.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50093000
      }
    },
    {
      "position": 94,
      "wave": 19,
      "role": "test",
      "concept": "test congestion",
      "conceptTag": "path-congestion",
      "levelId": "sky-94-congestion-test",
      "levelPath": "levels/campaign/sky-94-congestion-test.level.json",
      "evidencePath": "levels/evidence/sky-94-congestion-test.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50094021
      }
    },
    {
      "position": 95,
      "wave": 19,
      "role": "recover",
      "concept": "congestion recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-95-congestion-recover",
      "levelPath": "levels/campaign/sky-95-congestion-recover.level.json",
      "evidencePath": "levels/evidence/sky-95-congestion-recover.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50095025
      }
    },
    {
      "position": 96,
      "wave": 20,
      "role": "teach",
      "concept": "introduce congestion",
      "conceptTag": "path-congestion",
      "levelId": "sky-96-congestion-teach",
      "levelPath": "levels/campaign/sky-96-congestion-teach.level.json",
      "evidencePath": "levels/evidence/sky-96-congestion-teach.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50096011
      }
    },
    {
      "position": 97,
      "wave": 20,
      "role": "practice",
      "concept": "practice congestion",
      "conceptTag": "path-congestion",
      "levelId": "sky-97-congestion-practice",
      "levelPath": "levels/campaign/sky-97-congestion-practice.level.json",
      "evidencePath": "levels/evidence/sky-97-congestion-practice.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50097018
      }
    },
    {
      "position": 98,
      "wave": 20,
      "role": "combine",
      "concept": "combine congestion",
      "conceptTag": "path-congestion",
      "levelId": "sky-98-congestion-combine",
      "levelPath": "levels/campaign/sky-98-congestion-combine.level.json",
      "evidencePath": "levels/evidence/sky-98-congestion-combine.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50098030
      }
    },
    {
      "position": 99,
      "wave": 20,
      "role": "test",
      "concept": "test congestion",
      "conceptTag": "path-congestion",
      "levelId": "sky-99-congestion-test",
      "levelPath": "levels/campaign/sky-99-congestion-test.level.json",
      "evidencePath": "levels/evidence/sky-99-congestion-test.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50099020
      }
    },
    {
      "position": 100,
      "wave": 20,
      "role": "recover",
      "concept": "congestion recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-100-congestion-recover",
      "levelPath": "levels/campaign/sky-100-congestion-recover.level.json",
      "evidencePath": "levels/evidence/sky-100-congestion-recover.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50100005
      }
    },
    {
      "position": 101,
      "wave": 21,
      "role": "teach",
      "concept": "introduce congestion",
      "conceptTag": "path-congestion",
      "levelId": "sky-101-congestion-teach",
      "levelPath": "levels/campaign/sky-101-congestion-teach.level.json",
      "evidencePath": "levels/evidence/sky-101-congestion-teach.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50101000
      }
    },
    {
      "position": 102,
      "wave": 21,
      "role": "practice",
      "concept": "practice congestion",
      "conceptTag": "path-congestion",
      "levelId": "sky-102-congestion-practice",
      "levelPath": "levels/campaign/sky-102-congestion-practice.level.json",
      "evidencePath": "levels/evidence/sky-102-congestion-practice.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50102012
      }
    },
    {
      "position": 103,
      "wave": 21,
      "role": "combine",
      "concept": "combine congestion",
      "conceptTag": "path-congestion",
      "levelId": "sky-103-congestion-combine",
      "levelPath": "levels/campaign/sky-103-congestion-combine.level.json",
      "evidencePath": "levels/evidence/sky-103-congestion-combine.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50103015
      }
    },
    {
      "position": 104,
      "wave": 21,
      "role": "test",
      "concept": "test congestion",
      "conceptTag": "path-congestion",
      "levelId": "sky-104-congestion-test",
      "levelPath": "levels/campaign/sky-104-congestion-test.level.json",
      "evidencePath": "levels/evidence/sky-104-congestion-test.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50104013
      }
    },
    {
      "position": 105,
      "wave": 21,
      "role": "recover",
      "concept": "congestion recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-105-congestion-recover",
      "levelPath": "levels/campaign/sky-105-congestion-recover.level.json",
      "evidencePath": "levels/evidence/sky-105-congestion-recover.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50105034
      }
    },
    {
      "position": 106,
      "wave": 22,
      "role": "teach",
      "concept": "introduce congestion",
      "conceptTag": "path-congestion",
      "levelId": "sky-106-congestion-teach",
      "levelPath": "levels/campaign/sky-106-congestion-teach.level.json",
      "evidencePath": "levels/evidence/sky-106-congestion-teach.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50106006
      }
    },
    {
      "position": 107,
      "wave": 22,
      "role": "practice",
      "concept": "practice congestion",
      "conceptTag": "path-congestion",
      "levelId": "sky-107-congestion-practice",
      "levelPath": "levels/campaign/sky-107-congestion-practice.level.json",
      "evidencePath": "levels/evidence/sky-107-congestion-practice.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50107007
      }
    },
    {
      "position": 108,
      "wave": 22,
      "role": "combine",
      "concept": "combine congestion",
      "conceptTag": "path-congestion",
      "levelId": "sky-108-congestion-combine",
      "levelPath": "levels/campaign/sky-108-congestion-combine.level.json",
      "evidencePath": "levels/evidence/sky-108-congestion-combine.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50108009
      }
    },
    {
      "position": 109,
      "wave": 22,
      "role": "test",
      "concept": "test congestion",
      "conceptTag": "path-congestion",
      "levelId": "sky-109-congestion-test",
      "levelPath": "levels/campaign/sky-109-congestion-test.level.json",
      "evidencePath": "levels/evidence/sky-109-congestion-test.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50109000
      }
    },
    {
      "position": 110,
      "wave": 22,
      "role": "recover",
      "concept": "congestion recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-110-congestion-recover",
      "levelPath": "levels/campaign/sky-110-congestion-recover.level.json",
      "evidencePath": "levels/evidence/sky-110-congestion-recover.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50110011
      }
    },
    {
      "position": 111,
      "wave": 23,
      "role": "teach",
      "concept": "introduce congestion",
      "conceptTag": "path-congestion",
      "levelId": "sky-111-congestion-teach",
      "levelPath": "levels/campaign/sky-111-congestion-teach.level.json",
      "evidencePath": "levels/evidence/sky-111-congestion-teach.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50111006
      }
    },
    {
      "position": 112,
      "wave": 23,
      "role": "practice",
      "concept": "practice congestion",
      "conceptTag": "path-congestion",
      "levelId": "sky-112-congestion-practice",
      "levelPath": "levels/campaign/sky-112-congestion-practice.level.json",
      "evidencePath": "levels/evidence/sky-112-congestion-practice.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50112012
      }
    },
    {
      "position": 113,
      "wave": 23,
      "role": "combine",
      "concept": "combine congestion",
      "conceptTag": "path-congestion",
      "levelId": "sky-113-congestion-combine",
      "levelPath": "levels/campaign/sky-113-congestion-combine.level.json",
      "evidencePath": "levels/evidence/sky-113-congestion-combine.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50113021
      }
    },
    {
      "position": 114,
      "wave": 23,
      "role": "test",
      "concept": "test congestion",
      "conceptTag": "path-congestion",
      "levelId": "sky-114-congestion-test",
      "levelPath": "levels/campaign/sky-114-congestion-test.level.json",
      "evidencePath": "levels/evidence/sky-114-congestion-test.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50114016
      }
    },
    {
      "position": 115,
      "wave": 23,
      "role": "recover",
      "concept": "congestion recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-115-congestion-recover",
      "levelPath": "levels/campaign/sky-115-congestion-recover.level.json",
      "evidencePath": "levels/evidence/sky-115-congestion-recover.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50115010
      }
    },
    {
      "position": 116,
      "wave": 24,
      "role": "teach",
      "concept": "introduce congestion",
      "conceptTag": "path-congestion",
      "levelId": "sky-116-congestion-teach",
      "levelPath": "levels/campaign/sky-116-congestion-teach.level.json",
      "evidencePath": "levels/evidence/sky-116-congestion-teach.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50116027
      }
    },
    {
      "position": 117,
      "wave": 24,
      "role": "practice",
      "concept": "practice congestion",
      "conceptTag": "path-congestion",
      "levelId": "sky-117-congestion-practice",
      "levelPath": "levels/campaign/sky-117-congestion-practice.level.json",
      "evidencePath": "levels/evidence/sky-117-congestion-practice.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50117003
      }
    },
    {
      "position": 118,
      "wave": 24,
      "role": "combine",
      "concept": "combine congestion",
      "conceptTag": "path-congestion",
      "levelId": "sky-118-congestion-combine",
      "levelPath": "levels/campaign/sky-118-congestion-combine.level.json",
      "evidencePath": "levels/evidence/sky-118-congestion-combine.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50118030
      }
    },
    {
      "position": 119,
      "wave": 24,
      "role": "test",
      "concept": "test congestion",
      "conceptTag": "path-congestion",
      "levelId": "sky-119-congestion-test",
      "levelPath": "levels/campaign/sky-119-congestion-test.level.json",
      "evidencePath": "levels/evidence/sky-119-congestion-test.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50119017
      }
    },
    {
      "position": 120,
      "wave": 24,
      "role": "recover",
      "concept": "congestion recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-120-congestion-recover",
      "levelPath": "levels/campaign/sky-120-congestion-recover.level.json",
      "evidencePath": "levels/evidence/sky-120-congestion-recover.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50120005
      }
    },
    {
      "position": 121,
      "wave": 25,
      "role": "teach",
      "concept": "introduce counterintuitive-routing",
      "conceptTag": "counterintuitive-push",
      "levelId": "sky-121-counterintuitive-routing-teach",
      "levelPath": "levels/campaign/sky-121-counterintuitive-routing-teach.level.json",
      "evidencePath": "levels/evidence/sky-121-counterintuitive-routing-teach.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50121000
      }
    },
    {
      "position": 122,
      "wave": 25,
      "role": "practice",
      "concept": "practice counterintuitive-routing",
      "conceptTag": "counterintuitive-push",
      "levelId": "sky-122-counterintuitive-routing-practice",
      "levelPath": "levels/campaign/sky-122-counterintuitive-routing-practice.level.json",
      "evidencePath": "levels/evidence/sky-122-counterintuitive-routing-practice.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50122022
      }
    },
    {
      "position": 123,
      "wave": 25,
      "role": "combine",
      "concept": "combine counterintuitive-routing",
      "conceptTag": "counterintuitive-push",
      "levelId": "sky-123-counterintuitive-routing-combine",
      "levelPath": "levels/campaign/sky-123-counterintuitive-routing-combine.level.json",
      "evidencePath": "levels/evidence/sky-123-counterintuitive-routing-combine.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50123018
      }
    },
    {
      "position": 124,
      "wave": 25,
      "role": "test",
      "concept": "test counterintuitive-routing",
      "conceptTag": "counterintuitive-push",
      "levelId": "sky-124-counterintuitive-routing-test",
      "levelPath": "levels/campaign/sky-124-counterintuitive-routing-test.level.json",
      "evidencePath": "levels/evidence/sky-124-counterintuitive-routing-test.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50124000
      }
    },
    {
      "position": 125,
      "wave": 25,
      "role": "recover",
      "concept": "counterintuitive-routing recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-125-counterintuitive-routing-recover",
      "levelPath": "levels/campaign/sky-125-counterintuitive-routing-recover.level.json",
      "evidencePath": "levels/evidence/sky-125-counterintuitive-routing-recover.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50125026
      }
    },
    {
      "position": 126,
      "wave": 26,
      "role": "teach",
      "concept": "introduce counterintuitive-routing",
      "conceptTag": "counterintuitive-push",
      "levelId": "sky-126-counterintuitive-routing-teach",
      "levelPath": "levels/campaign/sky-126-counterintuitive-routing-teach.level.json",
      "evidencePath": "levels/evidence/sky-126-counterintuitive-routing-teach.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50126004
      }
    },
    {
      "position": 127,
      "wave": 26,
      "role": "practice",
      "concept": "practice counterintuitive-routing",
      "conceptTag": "counterintuitive-push",
      "levelId": "sky-127-counterintuitive-routing-practice",
      "levelPath": "levels/campaign/sky-127-counterintuitive-routing-practice.level.json",
      "evidencePath": "levels/evidence/sky-127-counterintuitive-routing-practice.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50127000
      }
    },
    {
      "position": 128,
      "wave": 26,
      "role": "combine",
      "concept": "combine counterintuitive-routing",
      "conceptTag": "counterintuitive-push",
      "levelId": "sky-128-counterintuitive-routing-combine",
      "levelPath": "levels/campaign/sky-128-counterintuitive-routing-combine.level.json",
      "evidencePath": "levels/evidence/sky-128-counterintuitive-routing-combine.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50128004
      }
    },
    {
      "position": 129,
      "wave": 26,
      "role": "test",
      "concept": "test counterintuitive-routing",
      "conceptTag": "counterintuitive-push",
      "levelId": "sky-129-counterintuitive-routing-test",
      "levelPath": "levels/campaign/sky-129-counterintuitive-routing-test.level.json",
      "evidencePath": "levels/evidence/sky-129-counterintuitive-routing-test.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50129030
      }
    },
    {
      "position": 130,
      "wave": 26,
      "role": "recover",
      "concept": "counterintuitive-routing recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-130-counterintuitive-routing-recover",
      "levelPath": "levels/campaign/sky-130-counterintuitive-routing-recover.level.json",
      "evidencePath": "levels/evidence/sky-130-counterintuitive-routing-recover.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50130026
      }
    },
    {
      "position": 131,
      "wave": 27,
      "role": "teach",
      "concept": "introduce counterintuitive-routing",
      "conceptTag": "counterintuitive-push",
      "levelId": "sky-131-counterintuitive-routing-teach",
      "levelPath": "levels/campaign/sky-131-counterintuitive-routing-teach.level.json",
      "evidencePath": "levels/evidence/sky-131-counterintuitive-routing-teach.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50131000
      }
    },
    {
      "position": 132,
      "wave": 27,
      "role": "practice",
      "concept": "practice counterintuitive-routing",
      "conceptTag": "counterintuitive-push",
      "levelId": "sky-132-counterintuitive-routing-practice",
      "levelPath": "levels/campaign/sky-132-counterintuitive-routing-practice.level.json",
      "evidencePath": "levels/evidence/sky-132-counterintuitive-routing-practice.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50132003
      }
    },
    {
      "position": 133,
      "wave": 27,
      "role": "combine",
      "concept": "combine counterintuitive-routing",
      "conceptTag": "counterintuitive-push",
      "levelId": "sky-133-counterintuitive-routing-combine",
      "levelPath": "levels/campaign/sky-133-counterintuitive-routing-combine.level.json",
      "evidencePath": "levels/evidence/sky-133-counterintuitive-routing-combine.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50133012
      }
    },
    {
      "position": 134,
      "wave": 27,
      "role": "test",
      "concept": "test counterintuitive-routing",
      "conceptTag": "counterintuitive-push",
      "levelId": "sky-134-counterintuitive-routing-test",
      "levelPath": "levels/campaign/sky-134-counterintuitive-routing-test.level.json",
      "evidencePath": "levels/evidence/sky-134-counterintuitive-routing-test.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50134027
      }
    },
    {
      "position": 135,
      "wave": 27,
      "role": "recover",
      "concept": "counterintuitive-routing recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-135-counterintuitive-routing-recover",
      "levelPath": "levels/campaign/sky-135-counterintuitive-routing-recover.level.json",
      "evidencePath": "levels/evidence/sky-135-counterintuitive-routing-recover.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50135013
      }
    },
    {
      "position": 136,
      "wave": 28,
      "role": "teach",
      "concept": "introduce counterintuitive-routing",
      "conceptTag": "counterintuitive-push",
      "levelId": "sky-136-counterintuitive-routing-teach",
      "levelPath": "levels/campaign/sky-136-counterintuitive-routing-teach.level.json",
      "evidencePath": "levels/evidence/sky-136-counterintuitive-routing-teach.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50136019
      }
    },
    {
      "position": 137,
      "wave": 28,
      "role": "practice",
      "concept": "practice counterintuitive-routing",
      "conceptTag": "counterintuitive-push",
      "levelId": "sky-137-counterintuitive-routing-practice",
      "levelPath": "levels/campaign/sky-137-counterintuitive-routing-practice.level.json",
      "evidencePath": "levels/evidence/sky-137-counterintuitive-routing-practice.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50137004
      }
    },
    {
      "position": 138,
      "wave": 28,
      "role": "combine",
      "concept": "combine counterintuitive-routing",
      "conceptTag": "counterintuitive-push",
      "levelId": "sky-138-counterintuitive-routing-combine",
      "levelPath": "levels/campaign/sky-138-counterintuitive-routing-combine.level.json",
      "evidencePath": "levels/evidence/sky-138-counterintuitive-routing-combine.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50138017
      }
    },
    {
      "position": 139,
      "wave": 28,
      "role": "test",
      "concept": "test counterintuitive-routing",
      "conceptTag": "counterintuitive-push",
      "levelId": "sky-139-counterintuitive-routing-test",
      "levelPath": "levels/campaign/sky-139-counterintuitive-routing-test.level.json",
      "evidencePath": "levels/evidence/sky-139-counterintuitive-routing-test.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50139020
      }
    },
    {
      "position": 140,
      "wave": 28,
      "role": "recover",
      "concept": "counterintuitive-routing recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-140-counterintuitive-routing-recover",
      "levelPath": "levels/campaign/sky-140-counterintuitive-routing-recover.level.json",
      "evidencePath": "levels/evidence/sky-140-counterintuitive-routing-recover.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50140033
      }
    },
    {
      "position": 141,
      "wave": 29,
      "role": "teach",
      "concept": "introduce counterintuitive-routing",
      "conceptTag": "counterintuitive-push",
      "levelId": "sky-141-counterintuitive-routing-teach",
      "levelPath": "levels/campaign/sky-141-counterintuitive-routing-teach.level.json",
      "evidencePath": "levels/evidence/sky-141-counterintuitive-routing-teach.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50141015
      }
    },
    {
      "position": 142,
      "wave": 29,
      "role": "practice",
      "concept": "practice counterintuitive-routing",
      "conceptTag": "counterintuitive-push",
      "levelId": "sky-142-counterintuitive-routing-practice",
      "levelPath": "levels/campaign/sky-142-counterintuitive-routing-practice.level.json",
      "evidencePath": "levels/evidence/sky-142-counterintuitive-routing-practice.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50142018
      }
    },
    {
      "position": 143,
      "wave": 29,
      "role": "combine",
      "concept": "combine counterintuitive-routing",
      "conceptTag": "counterintuitive-push",
      "levelId": "sky-143-counterintuitive-routing-combine",
      "levelPath": "levels/campaign/sky-143-counterintuitive-routing-combine.level.json",
      "evidencePath": "levels/evidence/sky-143-counterintuitive-routing-combine.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50143020
      }
    },
    {
      "position": 144,
      "wave": 29,
      "role": "test",
      "concept": "test counterintuitive-routing",
      "conceptTag": "counterintuitive-push",
      "levelId": "sky-144-counterintuitive-routing-test",
      "levelPath": "levels/campaign/sky-144-counterintuitive-routing-test.level.json",
      "evidencePath": "levels/evidence/sky-144-counterintuitive-routing-test.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50144029
      }
    },
    {
      "position": 145,
      "wave": 29,
      "role": "recover",
      "concept": "counterintuitive-routing recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-145-counterintuitive-routing-recover",
      "levelPath": "levels/campaign/sky-145-counterintuitive-routing-recover.level.json",
      "evidencePath": "levels/evidence/sky-145-counterintuitive-routing-recover.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50145025
      }
    },
    {
      "position": 146,
      "wave": 30,
      "role": "teach",
      "concept": "introduce counterintuitive-routing",
      "conceptTag": "counterintuitive-push",
      "levelId": "sky-146-counterintuitive-routing-teach",
      "levelPath": "levels/campaign/sky-146-counterintuitive-routing-teach.level.json",
      "evidencePath": "levels/evidence/sky-146-counterintuitive-routing-teach.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50146033
      }
    },
    {
      "position": 147,
      "wave": 30,
      "role": "practice",
      "concept": "practice counterintuitive-routing",
      "conceptTag": "counterintuitive-push",
      "levelId": "sky-147-counterintuitive-routing-practice",
      "levelPath": "levels/campaign/sky-147-counterintuitive-routing-practice.level.json",
      "evidencePath": "levels/evidence/sky-147-counterintuitive-routing-practice.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50147022
      }
    },
    {
      "position": 148,
      "wave": 30,
      "role": "combine",
      "concept": "combine counterintuitive-routing",
      "conceptTag": "counterintuitive-push",
      "levelId": "sky-148-counterintuitive-routing-combine",
      "levelPath": "levels/campaign/sky-148-counterintuitive-routing-combine.level.json",
      "evidencePath": "levels/evidence/sky-148-counterintuitive-routing-combine.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50148010
      }
    },
    {
      "position": 149,
      "wave": 30,
      "role": "test",
      "concept": "test counterintuitive-routing",
      "conceptTag": "counterintuitive-push",
      "levelId": "sky-149-counterintuitive-routing-test",
      "levelPath": "levels/campaign/sky-149-counterintuitive-routing-test.level.json",
      "evidencePath": "levels/evidence/sky-149-counterintuitive-routing-test.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50149011
      }
    },
    {
      "position": 150,
      "wave": 30,
      "role": "recover",
      "concept": "counterintuitive-routing recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-150-counterintuitive-routing-recover",
      "levelPath": "levels/campaign/sky-150-counterintuitive-routing-recover.level.json",
      "evidencePath": "levels/evidence/sky-150-counterintuitive-routing-recover.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50150002
      }
    },
    {
      "position": 151,
      "wave": 31,
      "role": "teach",
      "concept": "introduce multi-box-dependency",
      "conceptTag": "multi-box-dependency",
      "levelId": "sky-151-multi-box-dependency-teach",
      "levelPath": "levels/campaign/sky-151-multi-box-dependency-teach.level.json",
      "evidencePath": "levels/evidence/sky-151-multi-box-dependency-teach.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50151027
      }
    },
    {
      "position": 152,
      "wave": 31,
      "role": "practice",
      "concept": "practice multi-box-dependency",
      "conceptTag": "multi-box-dependency",
      "levelId": "sky-152-multi-box-dependency-practice",
      "levelPath": "levels/campaign/sky-152-multi-box-dependency-practice.level.json",
      "evidencePath": "levels/evidence/sky-152-multi-box-dependency-practice.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50152008
      }
    },
    {
      "position": 153,
      "wave": 31,
      "role": "combine",
      "concept": "combine multi-box-dependency",
      "conceptTag": "multi-box-dependency",
      "levelId": "sky-153-multi-box-dependency-combine",
      "levelPath": "levels/campaign/sky-153-multi-box-dependency-combine.level.json",
      "evidencePath": "levels/evidence/sky-153-multi-box-dependency-combine.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50153004
      }
    },
    {
      "position": 154,
      "wave": 31,
      "role": "test",
      "concept": "test multi-box-dependency",
      "conceptTag": "multi-box-dependency",
      "levelId": "sky-154-multi-box-dependency-test",
      "levelPath": "levels/campaign/sky-154-multi-box-dependency-test.level.json",
      "evidencePath": "levels/evidence/sky-154-multi-box-dependency-test.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50154030
      }
    },
    {
      "position": 155,
      "wave": 31,
      "role": "recover",
      "concept": "multi-box-dependency recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-155-multi-box-dependency-recover",
      "levelPath": "levels/campaign/sky-155-multi-box-dependency-recover.level.json",
      "evidencePath": "levels/evidence/sky-155-multi-box-dependency-recover.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50155007
      }
    },
    {
      "position": 156,
      "wave": 32,
      "role": "teach",
      "concept": "introduce multi-box-dependency",
      "conceptTag": "multi-box-dependency",
      "levelId": "sky-156-multi-box-dependency-teach",
      "levelPath": "levels/campaign/sky-156-multi-box-dependency-teach.level.json",
      "evidencePath": "levels/evidence/sky-156-multi-box-dependency-teach.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50156034
      }
    },
    {
      "position": 157,
      "wave": 32,
      "role": "practice",
      "concept": "practice multi-box-dependency",
      "conceptTag": "multi-box-dependency",
      "levelId": "sky-157-multi-box-dependency-practice",
      "levelPath": "levels/campaign/sky-157-multi-box-dependency-practice.level.json",
      "evidencePath": "levels/evidence/sky-157-multi-box-dependency-practice.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50157024
      }
    },
    {
      "position": 158,
      "wave": 32,
      "role": "combine",
      "concept": "combine multi-box-dependency",
      "conceptTag": "multi-box-dependency",
      "levelId": "sky-158-multi-box-dependency-combine",
      "levelPath": "levels/campaign/sky-158-multi-box-dependency-combine.level.json",
      "evidencePath": "levels/evidence/sky-158-multi-box-dependency-combine.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50158002
      }
    },
    {
      "position": 159,
      "wave": 32,
      "role": "test",
      "concept": "test multi-box-dependency",
      "conceptTag": "multi-box-dependency",
      "levelId": "sky-159-multi-box-dependency-test",
      "levelPath": "levels/campaign/sky-159-multi-box-dependency-test.level.json",
      "evidencePath": "levels/evidence/sky-159-multi-box-dependency-test.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50159022
      }
    },
    {
      "position": 160,
      "wave": 32,
      "role": "recover",
      "concept": "multi-box-dependency recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-160-multi-box-dependency-recover",
      "levelPath": "levels/campaign/sky-160-multi-box-dependency-recover.level.json",
      "evidencePath": "levels/evidence/sky-160-multi-box-dependency-recover.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50160011
      }
    },
    {
      "position": 161,
      "wave": 33,
      "role": "teach",
      "concept": "introduce multi-box-dependency",
      "conceptTag": "multi-box-dependency",
      "levelId": "sky-161-multi-box-dependency-teach",
      "levelPath": "levels/campaign/sky-161-multi-box-dependency-teach.level.json",
      "evidencePath": "levels/evidence/sky-161-multi-box-dependency-teach.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50161017
      }
    },
    {
      "position": 162,
      "wave": 33,
      "role": "practice",
      "concept": "practice multi-box-dependency",
      "conceptTag": "multi-box-dependency",
      "levelId": "sky-162-multi-box-dependency-practice",
      "levelPath": "levels/campaign/sky-162-multi-box-dependency-practice.level.json",
      "evidencePath": "levels/evidence/sky-162-multi-box-dependency-practice.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50162016
      }
    },
    {
      "position": 163,
      "wave": 33,
      "role": "combine",
      "concept": "combine multi-box-dependency",
      "conceptTag": "multi-box-dependency",
      "levelId": "sky-163-multi-box-dependency-combine",
      "levelPath": "levels/campaign/sky-163-multi-box-dependency-combine.level.json",
      "evidencePath": "levels/evidence/sky-163-multi-box-dependency-combine.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50163023
      }
    },
    {
      "position": 164,
      "wave": 33,
      "role": "test",
      "concept": "test multi-box-dependency",
      "conceptTag": "multi-box-dependency",
      "levelId": "sky-164-multi-box-dependency-test",
      "levelPath": "levels/campaign/sky-164-multi-box-dependency-test.level.json",
      "evidencePath": "levels/evidence/sky-164-multi-box-dependency-test.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50164033
      }
    },
    {
      "position": 165,
      "wave": 33,
      "role": "recover",
      "concept": "multi-box-dependency recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-165-multi-box-dependency-recover",
      "levelPath": "levels/campaign/sky-165-multi-box-dependency-recover.level.json",
      "evidencePath": "levels/evidence/sky-165-multi-box-dependency-recover.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50165014
      }
    },
    {
      "position": 166,
      "wave": 34,
      "role": "teach",
      "concept": "introduce multi-box-dependency",
      "conceptTag": "multi-box-dependency",
      "levelId": "sky-166-multi-box-dependency-teach",
      "levelPath": "levels/campaign/sky-166-multi-box-dependency-teach.level.json",
      "evidencePath": "levels/evidence/sky-166-multi-box-dependency-teach.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50166030
      }
    },
    {
      "position": 167,
      "wave": 34,
      "role": "practice",
      "concept": "practice multi-box-dependency",
      "conceptTag": "multi-box-dependency",
      "levelId": "sky-167-multi-box-dependency-practice",
      "levelPath": "levels/campaign/sky-167-multi-box-dependency-practice.level.json",
      "evidencePath": "levels/evidence/sky-167-multi-box-dependency-practice.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50167018
      }
    },
    {
      "position": 168,
      "wave": 34,
      "role": "combine",
      "concept": "combine multi-box-dependency",
      "conceptTag": "multi-box-dependency",
      "levelId": "sky-168-multi-box-dependency-combine",
      "levelPath": "levels/campaign/sky-168-multi-box-dependency-combine.level.json",
      "evidencePath": "levels/evidence/sky-168-multi-box-dependency-combine.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50168015
      }
    },
    {
      "position": 169,
      "wave": 34,
      "role": "test",
      "concept": "test multi-box-dependency",
      "conceptTag": "multi-box-dependency",
      "levelId": "sky-169-multi-box-dependency-test",
      "levelPath": "levels/campaign/sky-169-multi-box-dependency-test.level.json",
      "evidencePath": "levels/evidence/sky-169-multi-box-dependency-test.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50169020
      }
    },
    {
      "position": 170,
      "wave": 34,
      "role": "recover",
      "concept": "multi-box-dependency recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-170-multi-box-dependency-recover",
      "levelPath": "levels/campaign/sky-170-multi-box-dependency-recover.level.json",
      "evidencePath": "levels/evidence/sky-170-multi-box-dependency-recover.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50170011
      }
    },
    {
      "position": 171,
      "wave": 35,
      "role": "teach",
      "concept": "introduce multi-box-dependency",
      "conceptTag": "multi-box-dependency",
      "levelId": "sky-171-multi-box-dependency-teach",
      "levelPath": "levels/campaign/sky-171-multi-box-dependency-teach.level.json",
      "evidencePath": "levels/evidence/sky-171-multi-box-dependency-teach.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50171028
      }
    },
    {
      "position": 172,
      "wave": 35,
      "role": "practice",
      "concept": "practice multi-box-dependency",
      "conceptTag": "multi-box-dependency",
      "levelId": "sky-172-multi-box-dependency-practice",
      "levelPath": "levels/campaign/sky-172-multi-box-dependency-practice.level.json",
      "evidencePath": "levels/evidence/sky-172-multi-box-dependency-practice.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50172011
      }
    },
    {
      "position": 173,
      "wave": 35,
      "role": "combine",
      "concept": "combine multi-box-dependency",
      "conceptTag": "multi-box-dependency",
      "levelId": "sky-173-multi-box-dependency-combine",
      "levelPath": "levels/campaign/sky-173-multi-box-dependency-combine.level.json",
      "evidencePath": "levels/evidence/sky-173-multi-box-dependency-combine.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50173022
      }
    },
    {
      "position": 174,
      "wave": 35,
      "role": "test",
      "concept": "test multi-box-dependency",
      "conceptTag": "multi-box-dependency",
      "levelId": "sky-174-multi-box-dependency-test",
      "levelPath": "levels/campaign/sky-174-multi-box-dependency-test.level.json",
      "evidencePath": "levels/evidence/sky-174-multi-box-dependency-test.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50174008
      }
    },
    {
      "position": 175,
      "wave": 35,
      "role": "recover",
      "concept": "multi-box-dependency recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-175-multi-box-dependency-recover",
      "levelPath": "levels/campaign/sky-175-multi-box-dependency-recover.level.json",
      "evidencePath": "levels/evidence/sky-175-multi-box-dependency-recover.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50175032
      }
    },
    {
      "position": 176,
      "wave": 36,
      "role": "teach",
      "concept": "introduce multi-box-dependency",
      "conceptTag": "multi-box-dependency",
      "levelId": "sky-176-multi-box-dependency-teach",
      "levelPath": "levels/campaign/sky-176-multi-box-dependency-teach.level.json",
      "evidencePath": "levels/evidence/sky-176-multi-box-dependency-teach.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50176012
      }
    },
    {
      "position": 177,
      "wave": 36,
      "role": "practice",
      "concept": "practice multi-box-dependency",
      "conceptTag": "multi-box-dependency",
      "levelId": "sky-177-multi-box-dependency-practice",
      "levelPath": "levels/campaign/sky-177-multi-box-dependency-practice.level.json",
      "evidencePath": "levels/evidence/sky-177-multi-box-dependency-practice.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50177017
      }
    },
    {
      "position": 178,
      "wave": 36,
      "role": "combine",
      "concept": "combine multi-box-dependency",
      "conceptTag": "multi-box-dependency",
      "levelId": "sky-178-multi-box-dependency-combine",
      "levelPath": "levels/campaign/sky-178-multi-box-dependency-combine.level.json",
      "evidencePath": "levels/evidence/sky-178-multi-box-dependency-combine.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50178031
      }
    },
    {
      "position": 179,
      "wave": 36,
      "role": "test",
      "concept": "test multi-box-dependency",
      "conceptTag": "multi-box-dependency",
      "levelId": "sky-179-multi-box-dependency-test",
      "levelPath": "levels/campaign/sky-179-multi-box-dependency-test.level.json",
      "evidencePath": "levels/evidence/sky-179-multi-box-dependency-test.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50179008
      }
    },
    {
      "position": 180,
      "wave": 36,
      "role": "recover",
      "concept": "multi-box-dependency recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-180-multi-box-dependency-recover",
      "levelPath": "levels/campaign/sky-180-multi-box-dependency-recover.level.json",
      "evidencePath": "levels/evidence/sky-180-multi-box-dependency-recover.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50180026
      }
    },
    {
      "position": 181,
      "wave": 37,
      "role": "teach",
      "concept": "introduce mixed-mastery",
      "conceptTag": "mixed-mastery",
      "levelId": "sky-181-mixed-mastery-teach",
      "levelPath": "levels/campaign/sky-181-mixed-mastery-teach.level.json",
      "evidencePath": "levels/evidence/sky-181-mixed-mastery-teach.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50181014
      }
    },
    {
      "position": 182,
      "wave": 37,
      "role": "practice",
      "concept": "practice mixed-mastery",
      "conceptTag": "mixed-mastery",
      "levelId": "sky-182-mixed-mastery-practice",
      "levelPath": "levels/campaign/sky-182-mixed-mastery-practice.level.json",
      "evidencePath": "levels/evidence/sky-182-mixed-mastery-practice.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50182013
      }
    },
    {
      "position": 183,
      "wave": 37,
      "role": "combine",
      "concept": "combine mixed-mastery",
      "conceptTag": "mixed-mastery",
      "levelId": "sky-183-mixed-mastery-combine",
      "levelPath": "levels/campaign/sky-183-mixed-mastery-combine.level.json",
      "evidencePath": "levels/evidence/sky-183-mixed-mastery-combine.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50183009
      }
    },
    {
      "position": 184,
      "wave": 37,
      "role": "test",
      "concept": "test mixed-mastery",
      "conceptTag": "mixed-mastery",
      "levelId": "sky-184-mixed-mastery-test",
      "levelPath": "levels/campaign/sky-184-mixed-mastery-test.level.json",
      "evidencePath": "levels/evidence/sky-184-mixed-mastery-test.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50184017
      }
    },
    {
      "position": 185,
      "wave": 37,
      "role": "recover",
      "concept": "mixed-mastery recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-185-mixed-mastery-recover",
      "levelPath": "levels/campaign/sky-185-mixed-mastery-recover.level.json",
      "evidencePath": "levels/evidence/sky-185-mixed-mastery-recover.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50185033
      }
    },
    {
      "position": 186,
      "wave": 38,
      "role": "teach",
      "concept": "introduce mixed-mastery",
      "conceptTag": "mixed-mastery",
      "levelId": "sky-186-mixed-mastery-teach",
      "levelPath": "levels/campaign/sky-186-mixed-mastery-teach.level.json",
      "evidencePath": "levels/evidence/sky-186-mixed-mastery-teach.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50186003
      }
    },
    {
      "position": 187,
      "wave": 38,
      "role": "practice",
      "concept": "practice mixed-mastery",
      "conceptTag": "mixed-mastery",
      "levelId": "sky-187-mixed-mastery-practice",
      "levelPath": "levels/campaign/sky-187-mixed-mastery-practice.level.json",
      "evidencePath": "levels/evidence/sky-187-mixed-mastery-practice.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50187000
      }
    },
    {
      "position": 188,
      "wave": 38,
      "role": "combine",
      "concept": "combine mixed-mastery",
      "conceptTag": "mixed-mastery",
      "levelId": "sky-188-mixed-mastery-combine",
      "levelPath": "levels/campaign/sky-188-mixed-mastery-combine.level.json",
      "evidencePath": "levels/evidence/sky-188-mixed-mastery-combine.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50188019
      }
    },
    {
      "position": 189,
      "wave": 38,
      "role": "test",
      "concept": "test mixed-mastery",
      "conceptTag": "mixed-mastery",
      "levelId": "sky-189-mixed-mastery-test",
      "levelPath": "levels/campaign/sky-189-mixed-mastery-test.level.json",
      "evidencePath": "levels/evidence/sky-189-mixed-mastery-test.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50189005
      }
    },
    {
      "position": 190,
      "wave": 38,
      "role": "recover",
      "concept": "mixed-mastery recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-190-mixed-mastery-recover",
      "levelPath": "levels/campaign/sky-190-mixed-mastery-recover.level.json",
      "evidencePath": "levels/evidence/sky-190-mixed-mastery-recover.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50190016
      }
    },
    {
      "position": 191,
      "wave": 39,
      "role": "teach",
      "concept": "introduce mixed-mastery",
      "conceptTag": "mixed-mastery",
      "levelId": "sky-191-mixed-mastery-teach",
      "levelPath": "levels/campaign/sky-191-mixed-mastery-teach.level.json",
      "evidencePath": "levels/evidence/sky-191-mixed-mastery-teach.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50191026
      }
    },
    {
      "position": 192,
      "wave": 39,
      "role": "practice",
      "concept": "practice mixed-mastery",
      "conceptTag": "mixed-mastery",
      "levelId": "sky-192-mixed-mastery-practice",
      "levelPath": "levels/campaign/sky-192-mixed-mastery-practice.level.json",
      "evidencePath": "levels/evidence/sky-192-mixed-mastery-practice.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50192022
      }
    },
    {
      "position": 193,
      "wave": 39,
      "role": "combine",
      "concept": "combine mixed-mastery",
      "conceptTag": "mixed-mastery",
      "levelId": "sky-193-mixed-mastery-combine",
      "levelPath": "levels/campaign/sky-193-mixed-mastery-combine.level.json",
      "evidencePath": "levels/evidence/sky-193-mixed-mastery-combine.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50193035
      }
    },
    {
      "position": 194,
      "wave": 39,
      "role": "test",
      "concept": "test mixed-mastery",
      "conceptTag": "mixed-mastery",
      "levelId": "sky-194-mixed-mastery-test",
      "levelPath": "levels/campaign/sky-194-mixed-mastery-test.level.json",
      "evidencePath": "levels/evidence/sky-194-mixed-mastery-test.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50194000
      }
    },
    {
      "position": 195,
      "wave": 39,
      "role": "recover",
      "concept": "mixed-mastery recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-195-mixed-mastery-recover",
      "levelPath": "levels/campaign/sky-195-mixed-mastery-recover.level.json",
      "evidencePath": "levels/evidence/sky-195-mixed-mastery-recover.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50195015
      }
    },
    {
      "position": 196,
      "wave": 40,
      "role": "teach",
      "concept": "introduce mixed-mastery",
      "conceptTag": "mixed-mastery",
      "levelId": "sky-196-mixed-mastery-teach",
      "levelPath": "levels/campaign/sky-196-mixed-mastery-teach.level.json",
      "evidencePath": "levels/evidence/sky-196-mixed-mastery-teach.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50196024
      }
    },
    {
      "position": 197,
      "wave": 40,
      "role": "practice",
      "concept": "practice mixed-mastery",
      "conceptTag": "mixed-mastery",
      "levelId": "sky-197-mixed-mastery-practice",
      "levelPath": "levels/campaign/sky-197-mixed-mastery-practice.level.json",
      "evidencePath": "levels/evidence/sky-197-mixed-mastery-practice.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50197008
      }
    },
    {
      "position": 198,
      "wave": 40,
      "role": "combine",
      "concept": "combine mixed-mastery",
      "conceptTag": "mixed-mastery",
      "levelId": "sky-198-mixed-mastery-combine",
      "levelPath": "levels/campaign/sky-198-mixed-mastery-combine.level.json",
      "evidencePath": "levels/evidence/sky-198-mixed-mastery-combine.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50198000
      }
    },
    {
      "position": 199,
      "wave": 40,
      "role": "test",
      "concept": "test mixed-mastery",
      "conceptTag": "mixed-mastery",
      "levelId": "sky-199-mixed-mastery-test",
      "levelPath": "levels/campaign/sky-199-mixed-mastery-test.level.json",
      "evidencePath": "levels/evidence/sky-199-mixed-mastery-test.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50199017
      }
    },
    {
      "position": 200,
      "wave": 40,
      "role": "recover",
      "concept": "mixed-mastery recovery route",
      "conceptTag": "recovery",
      "levelId": "sky-200-mixed-mastery-recover",
      "levelPath": "levels/campaign/sky-200-mixed-mastery-recover.level.json",
      "evidencePath": "levels/evidence/sky-200-mixed-mastery-recover.evidence.json",
      "source": {
        "method": "curated-pocket-room",
        "generatorVersion": "pocket-room/mulberry32-v5",
        "seed": 50200019
      }
    }
  ]
}
`,na=`{
  "schema": "g-sokoban/runtime-campaign",
  "version": 1,
  "campaignId": "main",
  "entries": [
    {
      "position": 1,
      "levelId": "sky-01-first-light",
      "levelPath": "levels/campaign/sky-01-first-light.level.json",
      "optimalMoves": 1,
      "optimalPushes": 1
    },
    {
      "position": 2,
      "levelId": "sky-02-step-around",
      "levelPath": "levels/campaign/sky-02-step-around.level.json",
      "optimalMoves": 4,
      "optimalPushes": 2
    },
    {
      "position": 3,
      "levelId": "sky-03-turning-lane",
      "levelPath": "levels/campaign/sky-03-turning-lane.level.json",
      "optimalMoves": 7,
      "optimalPushes": 3
    },
    {
      "position": 4,
      "levelId": "sky-04-entry-test",
      "levelPath": "levels/campaign/sky-04-entry-test.level.json",
      "optimalMoves": 5,
      "optimalPushes": 3
    },
    {
      "position": 5,
      "levelId": "sky-05-clear-sky",
      "levelPath": "levels/campaign/sky-05-clear-sky.level.json",
      "optimalMoves": 1,
      "optimalPushes": 1
    },
    {
      "position": 6,
      "levelId": "sky-06-corner-warning",
      "levelPath": "levels/campaign/sky-06-corner-warning.level.json",
      "optimalMoves": 5,
      "optimalPushes": 3
    },
    {
      "position": 7,
      "levelId": "sky-07-back-route",
      "levelPath": "levels/campaign/sky-07-back-route.level.json",
      "optimalMoves": 2,
      "optimalPushes": 2
    },
    {
      "position": 8,
      "levelId": "sky-08-safe-approach",
      "levelPath": "levels/campaign/sky-08-safe-approach.level.json",
      "optimalMoves": 9,
      "optimalPushes": 3
    },
    {
      "position": 9,
      "levelId": "sky-09-wall-orbit",
      "levelPath": "levels/campaign/sky-09-wall-orbit.level.json",
      "optimalMoves": 5,
      "optimalPushes": 3
    },
    {
      "position": 10,
      "levelId": "sky-10-soft-landing",
      "levelPath": "levels/campaign/sky-10-soft-landing.level.json",
      "optimalMoves": 2,
      "optimalPushes": 2
    },
    {
      "position": 11,
      "levelId": "sky-11-two-stars",
      "levelPath": "levels/campaign/sky-11-two-stars.level.json",
      "optimalMoves": 9,
      "optimalPushes": 2
    },
    {
      "position": 12,
      "levelId": "sky-12-shift-change",
      "levelPath": "levels/campaign/sky-12-shift-change.level.json",
      "optimalMoves": 20,
      "optimalPushes": 3
    },
    {
      "position": 13,
      "levelId": "sky-13-order-lanes",
      "levelPath": "levels/campaign/sky-13-order-lanes.level.json",
      "optimalMoves": 26,
      "optimalPushes": 5
    },
    {
      "position": 14,
      "levelId": "sky-14-relay-test",
      "levelPath": "levels/campaign/sky-14-relay-test.level.json",
      "optimalMoves": 13,
      "optimalPushes": 5
    },
    {
      "position": 15,
      "levelId": "sky-15-twin-rest",
      "levelPath": "levels/campaign/sky-15-twin-rest.level.json",
      "optimalMoves": 7,
      "optimalPushes": 3
    },
    {
      "position": 16,
      "levelId": "sky-16-step-away",
      "levelPath": "levels/campaign/sky-16-step-away.level.json",
      "optimalMoves": 25,
      "optimalPushes": 5
    },
    {
      "position": 17,
      "levelId": "sky-17-long-arc",
      "levelPath": "levels/campaign/sky-17-long-arc.level.json",
      "optimalMoves": 20,
      "optimalPushes": 7
    },
    {
      "position": 18,
      "levelId": "sky-18-cross-current",
      "levelPath": "levels/campaign/sky-18-cross-current.level.json",
      "optimalMoves": 42,
      "optimalPushes": 6
    },
    {
      "position": 19,
      "levelId": "sky-19-retrograde",
      "levelPath": "levels/campaign/sky-19-retrograde.level.json",
      "optimalMoves": 48,
      "optimalPushes": 9
    },
    {
      "position": 20,
      "levelId": "sky-20-homeward",
      "levelPath": "levels/campaign/sky-20-homeward.level.json",
      "optimalMoves": 17,
      "optimalPushes": 6
    },
    {
      "position": 21,
      "levelId": "sky-21-shared-lane",
      "levelPath": "levels/campaign/sky-21-shared-lane.level.json",
      "optimalMoves": 20,
      "optimalPushes": 7
    },
    {
      "position": 22,
      "levelId": "sky-22-traffic-flow",
      "levelPath": "levels/campaign/sky-22-traffic-flow.level.json",
      "optimalMoves": 29,
      "optimalPushes": 11
    },
    {
      "position": 23,
      "levelId": "sky-23-switchyard",
      "levelPath": "levels/campaign/sky-23-switchyard.level.json",
      "optimalMoves": 35,
      "optimalPushes": 10
    },
    {
      "position": 24,
      "levelId": "sky-24-busy-orbit",
      "levelPath": "levels/campaign/sky-24-busy-orbit.level.json",
      "optimalMoves": 36,
      "optimalPushes": 8
    },
    {
      "position": 25,
      "levelId": "sky-25-open-channel",
      "levelPath": "levels/campaign/sky-25-open-channel.level.json",
      "optimalMoves": 26,
      "optimalPushes": 5
    },
    {
      "position": 26,
      "levelId": "sky-26-linked-stars",
      "levelPath": "levels/campaign/sky-26-linked-stars.level.json",
      "optimalMoves": 26,
      "optimalPushes": 10
    },
    {
      "position": 27,
      "levelId": "sky-27-dependency-chain",
      "levelPath": "levels/campaign/sky-27-dependency-chain.level.json",
      "optimalMoves": 31,
      "optimalPushes": 9
    },
    {
      "position": 28,
      "levelId": "sky-28-night-shift",
      "levelPath": "levels/campaign/sky-28-night-shift.level.json",
      "optimalMoves": 38,
      "optimalPushes": 14
    },
    {
      "position": 29,
      "levelId": "sky-29-grand-observatory",
      "levelPath": "levels/campaign/sky-29-grand-observatory.level.json",
      "optimalMoves": 37,
      "optimalPushes": 14
    },
    {
      "position": 30,
      "levelId": "sky-30-dawn-return",
      "levelPath": "levels/campaign/sky-30-dawn-return.level.json",
      "optimalMoves": 37,
      "optimalPushes": 9
    },
    {
      "position": 31,
      "levelId": "sky-31-sequencing-teach",
      "levelPath": "levels/campaign/sky-31-sequencing-teach.level.json",
      "optimalMoves": 26,
      "optimalPushes": 11
    },
    {
      "position": 32,
      "levelId": "sky-32-sequencing-practice",
      "levelPath": "levels/campaign/sky-32-sequencing-practice.level.json",
      "optimalMoves": 37,
      "optimalPushes": 12
    },
    {
      "position": 33,
      "levelId": "sky-33-sequencing-combine",
      "levelPath": "levels/campaign/sky-33-sequencing-combine.level.json",
      "optimalMoves": 36,
      "optimalPushes": 13
    },
    {
      "position": 34,
      "levelId": "sky-34-sequencing-test",
      "levelPath": "levels/campaign/sky-34-sequencing-test.level.json",
      "optimalMoves": 45,
      "optimalPushes": 16
    },
    {
      "position": 35,
      "levelId": "sky-35-sequencing-recover",
      "levelPath": "levels/campaign/sky-35-sequencing-recover.level.json",
      "optimalMoves": 13,
      "optimalPushes": 8
    },
    {
      "position": 36,
      "levelId": "sky-36-sequencing-teach",
      "levelPath": "levels/campaign/sky-36-sequencing-teach.level.json",
      "optimalMoves": 25,
      "optimalPushes": 12
    },
    {
      "position": 37,
      "levelId": "sky-37-sequencing-practice",
      "levelPath": "levels/campaign/sky-37-sequencing-practice.level.json",
      "optimalMoves": 45,
      "optimalPushes": 13
    },
    {
      "position": 38,
      "levelId": "sky-38-sequencing-combine",
      "levelPath": "levels/campaign/sky-38-sequencing-combine.level.json",
      "optimalMoves": 27,
      "optimalPushes": 14
    },
    {
      "position": 39,
      "levelId": "sky-39-sequencing-test",
      "levelPath": "levels/campaign/sky-39-sequencing-test.level.json",
      "optimalMoves": 45,
      "optimalPushes": 17
    },
    {
      "position": 40,
      "levelId": "sky-40-sequencing-recover",
      "levelPath": "levels/campaign/sky-40-sequencing-recover.level.json",
      "optimalMoves": 28,
      "optimalPushes": 9
    },
    {
      "position": 41,
      "levelId": "sky-41-sequencing-teach",
      "levelPath": "levels/campaign/sky-41-sequencing-teach.level.json",
      "optimalMoves": 25,
      "optimalPushes": 12
    },
    {
      "position": 42,
      "levelId": "sky-42-sequencing-practice",
      "levelPath": "levels/campaign/sky-42-sequencing-practice.level.json",
      "optimalMoves": 48,
      "optimalPushes": 14
    },
    {
      "position": 43,
      "levelId": "sky-43-sequencing-combine",
      "levelPath": "levels/campaign/sky-43-sequencing-combine.level.json",
      "optimalMoves": 49,
      "optimalPushes": 15
    },
    {
      "position": 44,
      "levelId": "sky-44-sequencing-test",
      "levelPath": "levels/campaign/sky-44-sequencing-test.level.json",
      "optimalMoves": 49,
      "optimalPushes": 18
    },
    {
      "position": 45,
      "levelId": "sky-45-sequencing-recover",
      "levelPath": "levels/campaign/sky-45-sequencing-recover.level.json",
      "optimalMoves": 22,
      "optimalPushes": 10
    },
    {
      "position": 46,
      "levelId": "sky-46-sequencing-teach",
      "levelPath": "levels/campaign/sky-46-sequencing-teach.level.json",
      "optimalMoves": 32,
      "optimalPushes": 13
    },
    {
      "position": 47,
      "levelId": "sky-47-sequencing-practice",
      "levelPath": "levels/campaign/sky-47-sequencing-practice.level.json",
      "optimalMoves": 37,
      "optimalPushes": 15
    },
    {
      "position": 48,
      "levelId": "sky-48-sequencing-combine",
      "levelPath": "levels/campaign/sky-48-sequencing-combine.level.json",
      "optimalMoves": 40,
      "optimalPushes": 17
    },
    {
      "position": 49,
      "levelId": "sky-49-sequencing-test",
      "levelPath": "levels/campaign/sky-49-sequencing-test.level.json",
      "optimalMoves": 50,
      "optimalPushes": 19
    },
    {
      "position": 50,
      "levelId": "sky-50-sequencing-recover",
      "levelPath": "levels/campaign/sky-50-sequencing-recover.level.json",
      "optimalMoves": 19,
      "optimalPushes": 10
    },
    {
      "position": 51,
      "levelId": "sky-51-sequencing-teach",
      "levelPath": "levels/campaign/sky-51-sequencing-teach.level.json",
      "optimalMoves": 23,
      "optimalPushes": 14
    },
    {
      "position": 52,
      "levelId": "sky-52-sequencing-practice",
      "levelPath": "levels/campaign/sky-52-sequencing-practice.level.json",
      "optimalMoves": 32,
      "optimalPushes": 16
    },
    {
      "position": 53,
      "levelId": "sky-53-sequencing-combine",
      "levelPath": "levels/campaign/sky-53-sequencing-combine.level.json",
      "optimalMoves": 48,
      "optimalPushes": 18
    },
    {
      "position": 54,
      "levelId": "sky-54-sequencing-test",
      "levelPath": "levels/campaign/sky-54-sequencing-test.level.json",
      "optimalMoves": 50,
      "optimalPushes": 19
    },
    {
      "position": 55,
      "levelId": "sky-55-sequencing-recover",
      "levelPath": "levels/campaign/sky-55-sequencing-recover.level.json",
      "optimalMoves": 25,
      "optimalPushes": 11
    },
    {
      "position": 56,
      "levelId": "sky-56-sequencing-teach",
      "levelPath": "levels/campaign/sky-56-sequencing-teach.level.json",
      "optimalMoves": 40,
      "optimalPushes": 15
    },
    {
      "position": 57,
      "levelId": "sky-57-sequencing-practice",
      "levelPath": "levels/campaign/sky-57-sequencing-practice.level.json",
      "optimalMoves": 34,
      "optimalPushes": 17
    },
    {
      "position": 58,
      "levelId": "sky-58-sequencing-combine",
      "levelPath": "levels/campaign/sky-58-sequencing-combine.level.json",
      "optimalMoves": 41,
      "optimalPushes": 19
    },
    {
      "position": 59,
      "levelId": "sky-59-sequencing-test",
      "levelPath": "levels/campaign/sky-59-sequencing-test.level.json",
      "optimalMoves": 47,
      "optimalPushes": 22
    },
    {
      "position": 60,
      "levelId": "sky-60-sequencing-recover",
      "levelPath": "levels/campaign/sky-60-sequencing-recover.level.json",
      "optimalMoves": 37,
      "optimalPushes": 11
    },
    {
      "position": 61,
      "levelId": "sky-61-staging-order-teach",
      "levelPath": "levels/campaign/sky-61-staging-order-teach.level.json",
      "optimalMoves": 27,
      "optimalPushes": 13
    },
    {
      "position": 62,
      "levelId": "sky-62-staging-order-practice",
      "levelPath": "levels/campaign/sky-62-staging-order-practice.level.json",
      "optimalMoves": 30,
      "optimalPushes": 14
    },
    {
      "position": 63,
      "levelId": "sky-63-staging-order-combine",
      "levelPath": "levels/campaign/sky-63-staging-order-combine.level.json",
      "optimalMoves": 40,
      "optimalPushes": 14
    },
    {
      "position": 64,
      "levelId": "sky-64-staging-order-test",
      "levelPath": "levels/campaign/sky-64-staging-order-test.level.json",
      "optimalMoves": 32,
      "optimalPushes": 15
    },
    {
      "position": 65,
      "levelId": "sky-65-staging-order-recover",
      "levelPath": "levels/campaign/sky-65-staging-order-recover.level.json",
      "optimalMoves": 21,
      "optimalPushes": 10
    },
    {
      "position": 66,
      "levelId": "sky-66-staging-order-teach",
      "levelPath": "levels/campaign/sky-66-staging-order-teach.level.json",
      "optimalMoves": 33,
      "optimalPushes": 12
    },
    {
      "position": 67,
      "levelId": "sky-67-staging-order-practice",
      "levelPath": "levels/campaign/sky-67-staging-order-practice.level.json",
      "optimalMoves": 31,
      "optimalPushes": 13
    },
    {
      "position": 68,
      "levelId": "sky-68-staging-order-combine",
      "levelPath": "levels/campaign/sky-68-staging-order-combine.level.json",
      "optimalMoves": 29,
      "optimalPushes": 14
    },
    {
      "position": 69,
      "levelId": "sky-69-staging-order-test",
      "levelPath": "levels/campaign/sky-69-staging-order-test.level.json",
      "optimalMoves": 43,
      "optimalPushes": 15
    },
    {
      "position": 70,
      "levelId": "sky-70-staging-order-recover",
      "levelPath": "levels/campaign/sky-70-staging-order-recover.level.json",
      "optimalMoves": 15,
      "optimalPushes": 9
    },
    {
      "position": 71,
      "levelId": "sky-71-staging-order-teach",
      "levelPath": "levels/campaign/sky-71-staging-order-teach.level.json",
      "optimalMoves": 26,
      "optimalPushes": 12
    },
    {
      "position": 72,
      "levelId": "sky-72-staging-order-practice",
      "levelPath": "levels/campaign/sky-72-staging-order-practice.level.json",
      "optimalMoves": 27,
      "optimalPushes": 14
    },
    {
      "position": 73,
      "levelId": "sky-73-staging-order-combine",
      "levelPath": "levels/campaign/sky-73-staging-order-combine.level.json",
      "optimalMoves": 27,
      "optimalPushes": 15
    },
    {
      "position": 74,
      "levelId": "sky-74-staging-order-test",
      "levelPath": "levels/campaign/sky-74-staging-order-test.level.json",
      "optimalMoves": 32,
      "optimalPushes": 16
    },
    {
      "position": 75,
      "levelId": "sky-75-staging-order-recover",
      "levelPath": "levels/campaign/sky-75-staging-order-recover.level.json",
      "optimalMoves": 24,
      "optimalPushes": 10
    },
    {
      "position": 76,
      "levelId": "sky-76-staging-order-teach",
      "levelPath": "levels/campaign/sky-76-staging-order-teach.level.json",
      "optimalMoves": 30,
      "optimalPushes": 13
    },
    {
      "position": 77,
      "levelId": "sky-77-staging-order-practice",
      "levelPath": "levels/campaign/sky-77-staging-order-practice.level.json",
      "optimalMoves": 34,
      "optimalPushes": 13
    },
    {
      "position": 78,
      "levelId": "sky-78-staging-order-combine",
      "levelPath": "levels/campaign/sky-78-staging-order-combine.level.json",
      "optimalMoves": 44,
      "optimalPushes": 16
    },
    {
      "position": 79,
      "levelId": "sky-79-staging-order-test",
      "levelPath": "levels/campaign/sky-79-staging-order-test.level.json",
      "optimalMoves": 45,
      "optimalPushes": 18
    },
    {
      "position": 80,
      "levelId": "sky-80-staging-order-recover",
      "levelPath": "levels/campaign/sky-80-staging-order-recover.level.json",
      "optimalMoves": 19,
      "optimalPushes": 11
    },
    {
      "position": 81,
      "levelId": "sky-81-staging-order-teach",
      "levelPath": "levels/campaign/sky-81-staging-order-teach.level.json",
      "optimalMoves": 30,
      "optimalPushes": 14
    },
    {
      "position": 82,
      "levelId": "sky-82-staging-order-practice",
      "levelPath": "levels/campaign/sky-82-staging-order-practice.level.json",
      "optimalMoves": 35,
      "optimalPushes": 14
    },
    {
      "position": 83,
      "levelId": "sky-83-staging-order-combine",
      "levelPath": "levels/campaign/sky-83-staging-order-combine.level.json",
      "optimalMoves": 33,
      "optimalPushes": 16
    },
    {
      "position": 84,
      "levelId": "sky-84-staging-order-test",
      "levelPath": "levels/campaign/sky-84-staging-order-test.level.json",
      "optimalMoves": 48,
      "optimalPushes": 18
    },
    {
      "position": 85,
      "levelId": "sky-85-staging-order-recover",
      "levelPath": "levels/campaign/sky-85-staging-order-recover.level.json",
      "optimalMoves": 25,
      "optimalPushes": 11
    },
    {
      "position": 86,
      "levelId": "sky-86-staging-order-teach",
      "levelPath": "levels/campaign/sky-86-staging-order-teach.level.json",
      "optimalMoves": 38,
      "optimalPushes": 13
    },
    {
      "position": 87,
      "levelId": "sky-87-staging-order-practice",
      "levelPath": "levels/campaign/sky-87-staging-order-practice.level.json",
      "optimalMoves": 34,
      "optimalPushes": 15
    },
    {
      "position": 88,
      "levelId": "sky-88-staging-order-combine",
      "levelPath": "levels/campaign/sky-88-staging-order-combine.level.json",
      "optimalMoves": 36,
      "optimalPushes": 15
    },
    {
      "position": 89,
      "levelId": "sky-89-staging-order-test",
      "levelPath": "levels/campaign/sky-89-staging-order-test.level.json",
      "optimalMoves": 37,
      "optimalPushes": 19
    },
    {
      "position": 90,
      "levelId": "sky-90-staging-order-recover",
      "levelPath": "levels/campaign/sky-90-staging-order-recover.level.json",
      "optimalMoves": 23,
      "optimalPushes": 10
    },
    {
      "position": 91,
      "levelId": "sky-91-congestion-teach",
      "levelPath": "levels/campaign/sky-91-congestion-teach.level.json",
      "optimalMoves": 30,
      "optimalPushes": 13
    },
    {
      "position": 92,
      "levelId": "sky-92-congestion-practice",
      "levelPath": "levels/campaign/sky-92-congestion-practice.level.json",
      "optimalMoves": 27,
      "optimalPushes": 15
    },
    {
      "position": 93,
      "levelId": "sky-93-congestion-combine",
      "levelPath": "levels/campaign/sky-93-congestion-combine.level.json",
      "optimalMoves": 31,
      "optimalPushes": 16
    },
    {
      "position": 94,
      "levelId": "sky-94-congestion-test",
      "levelPath": "levels/campaign/sky-94-congestion-test.level.json",
      "optimalMoves": 32,
      "optimalPushes": 15
    },
    {
      "position": 95,
      "levelId": "sky-95-congestion-recover",
      "levelPath": "levels/campaign/sky-95-congestion-recover.level.json",
      "optimalMoves": 20,
      "optimalPushes": 11
    },
    {
      "position": 96,
      "levelId": "sky-96-congestion-teach",
      "levelPath": "levels/campaign/sky-96-congestion-teach.level.json",
      "optimalMoves": 27,
      "optimalPushes": 14
    },
    {
      "position": 97,
      "levelId": "sky-97-congestion-practice",
      "levelPath": "levels/campaign/sky-97-congestion-practice.level.json",
      "optimalMoves": 35,
      "optimalPushes": 15
    },
    {
      "position": 98,
      "levelId": "sky-98-congestion-combine",
      "levelPath": "levels/campaign/sky-98-congestion-combine.level.json",
      "optimalMoves": 31,
      "optimalPushes": 15
    },
    {
      "position": 99,
      "levelId": "sky-99-congestion-test",
      "levelPath": "levels/campaign/sky-99-congestion-test.level.json",
      "optimalMoves": 34,
      "optimalPushes": 18
    },
    {
      "position": 100,
      "levelId": "sky-100-congestion-recover",
      "levelPath": "levels/campaign/sky-100-congestion-recover.level.json",
      "optimalMoves": 20,
      "optimalPushes": 9
    },
    {
      "position": 101,
      "levelId": "sky-101-congestion-teach",
      "levelPath": "levels/campaign/sky-101-congestion-teach.level.json",
      "optimalMoves": 36,
      "optimalPushes": 15
    },
    {
      "position": 102,
      "levelId": "sky-102-congestion-practice",
      "levelPath": "levels/campaign/sky-102-congestion-practice.level.json",
      "optimalMoves": 32,
      "optimalPushes": 15
    },
    {
      "position": 103,
      "levelId": "sky-103-congestion-combine",
      "levelPath": "levels/campaign/sky-103-congestion-combine.level.json",
      "optimalMoves": 34,
      "optimalPushes": 16
    },
    {
      "position": 104,
      "levelId": "sky-104-congestion-test",
      "levelPath": "levels/campaign/sky-104-congestion-test.level.json",
      "optimalMoves": 47,
      "optimalPushes": 18
    },
    {
      "position": 105,
      "levelId": "sky-105-congestion-recover",
      "levelPath": "levels/campaign/sky-105-congestion-recover.level.json",
      "optimalMoves": 29,
      "optimalPushes": 11
    },
    {
      "position": 106,
      "levelId": "sky-106-congestion-teach",
      "levelPath": "levels/campaign/sky-106-congestion-teach.level.json",
      "optimalMoves": 32,
      "optimalPushes": 14
    },
    {
      "position": 107,
      "levelId": "sky-107-congestion-practice",
      "levelPath": "levels/campaign/sky-107-congestion-practice.level.json",
      "optimalMoves": 38,
      "optimalPushes": 16
    },
    {
      "position": 108,
      "levelId": "sky-108-congestion-combine",
      "levelPath": "levels/campaign/sky-108-congestion-combine.level.json",
      "optimalMoves": 34,
      "optimalPushes": 16
    },
    {
      "position": 109,
      "levelId": "sky-109-congestion-test",
      "levelPath": "levels/campaign/sky-109-congestion-test.level.json",
      "optimalMoves": 42,
      "optimalPushes": 19
    },
    {
      "position": 110,
      "levelId": "sky-110-congestion-recover",
      "levelPath": "levels/campaign/sky-110-congestion-recover.level.json",
      "optimalMoves": 23,
      "optimalPushes": 11
    },
    {
      "position": 111,
      "levelId": "sky-111-congestion-teach",
      "levelPath": "levels/campaign/sky-111-congestion-teach.level.json",
      "optimalMoves": 23,
      "optimalPushes": 15
    },
    {
      "position": 112,
      "levelId": "sky-112-congestion-practice",
      "levelPath": "levels/campaign/sky-112-congestion-practice.level.json",
      "optimalMoves": 38,
      "optimalPushes": 16
    },
    {
      "position": 113,
      "levelId": "sky-113-congestion-combine",
      "levelPath": "levels/campaign/sky-113-congestion-combine.level.json",
      "optimalMoves": 43,
      "optimalPushes": 18
    },
    {
      "position": 114,
      "levelId": "sky-114-congestion-test",
      "levelPath": "levels/campaign/sky-114-congestion-test.level.json",
      "optimalMoves": 47,
      "optimalPushes": 18
    },
    {
      "position": 115,
      "levelId": "sky-115-congestion-recover",
      "levelPath": "levels/campaign/sky-115-congestion-recover.level.json",
      "optimalMoves": 30,
      "optimalPushes": 12
    },
    {
      "position": 116,
      "levelId": "sky-116-congestion-teach",
      "levelPath": "levels/campaign/sky-116-congestion-teach.level.json",
      "optimalMoves": 34,
      "optimalPushes": 15
    },
    {
      "position": 117,
      "levelId": "sky-117-congestion-practice",
      "levelPath": "levels/campaign/sky-117-congestion-practice.level.json",
      "optimalMoves": 30,
      "optimalPushes": 15
    },
    {
      "position": 118,
      "levelId": "sky-118-congestion-combine",
      "levelPath": "levels/campaign/sky-118-congestion-combine.level.json",
      "optimalMoves": 52,
      "optimalPushes": 18
    },
    {
      "position": 119,
      "levelId": "sky-119-congestion-test",
      "levelPath": "levels/campaign/sky-119-congestion-test.level.json",
      "optimalMoves": 39,
      "optimalPushes": 20
    },
    {
      "position": 120,
      "levelId": "sky-120-congestion-recover",
      "levelPath": "levels/campaign/sky-120-congestion-recover.level.json",
      "optimalMoves": 32,
      "optimalPushes": 12
    },
    {
      "position": 121,
      "levelId": "sky-121-counterintuitive-routing-teach",
      "levelPath": "levels/campaign/sky-121-counterintuitive-routing-teach.level.json",
      "optimalMoves": 33,
      "optimalPushes": 14
    },
    {
      "position": 122,
      "levelId": "sky-122-counterintuitive-routing-practice",
      "levelPath": "levels/campaign/sky-122-counterintuitive-routing-practice.level.json",
      "optimalMoves": 38,
      "optimalPushes": 16
    },
    {
      "position": 123,
      "levelId": "sky-123-counterintuitive-routing-combine",
      "levelPath": "levels/campaign/sky-123-counterintuitive-routing-combine.level.json",
      "optimalMoves": 32,
      "optimalPushes": 18
    },
    {
      "position": 124,
      "levelId": "sky-124-counterintuitive-routing-test",
      "levelPath": "levels/campaign/sky-124-counterintuitive-routing-test.level.json",
      "optimalMoves": 39,
      "optimalPushes": 18
    },
    {
      "position": 125,
      "levelId": "sky-125-counterintuitive-routing-recover",
      "levelPath": "levels/campaign/sky-125-counterintuitive-routing-recover.level.json",
      "optimalMoves": 19,
      "optimalPushes": 12
    },
    {
      "position": 126,
      "levelId": "sky-126-counterintuitive-routing-teach",
      "levelPath": "levels/campaign/sky-126-counterintuitive-routing-teach.level.json",
      "optimalMoves": 39,
      "optimalPushes": 15
    },
    {
      "position": 127,
      "levelId": "sky-127-counterintuitive-routing-practice",
      "levelPath": "levels/campaign/sky-127-counterintuitive-routing-practice.level.json",
      "optimalMoves": 35,
      "optimalPushes": 15
    },
    {
      "position": 128,
      "levelId": "sky-128-counterintuitive-routing-combine",
      "levelPath": "levels/campaign/sky-128-counterintuitive-routing-combine.level.json",
      "optimalMoves": 35,
      "optimalPushes": 17
    },
    {
      "position": 129,
      "levelId": "sky-129-counterintuitive-routing-test",
      "levelPath": "levels/campaign/sky-129-counterintuitive-routing-test.level.json",
      "optimalMoves": 46,
      "optimalPushes": 19
    },
    {
      "position": 130,
      "levelId": "sky-130-counterintuitive-routing-recover",
      "levelPath": "levels/campaign/sky-130-counterintuitive-routing-recover.level.json",
      "optimalMoves": 23,
      "optimalPushes": 13
    },
    {
      "position": 131,
      "levelId": "sky-131-counterintuitive-routing-teach",
      "levelPath": "levels/campaign/sky-131-counterintuitive-routing-teach.level.json",
      "optimalMoves": 25,
      "optimalPushes": 13
    },
    {
      "position": 132,
      "levelId": "sky-132-counterintuitive-routing-practice",
      "levelPath": "levels/campaign/sky-132-counterintuitive-routing-practice.level.json",
      "optimalMoves": 31,
      "optimalPushes": 15
    },
    {
      "position": 133,
      "levelId": "sky-133-counterintuitive-routing-combine",
      "levelPath": "levels/campaign/sky-133-counterintuitive-routing-combine.level.json",
      "optimalMoves": 43,
      "optimalPushes": 17
    },
    {
      "position": 134,
      "levelId": "sky-134-counterintuitive-routing-test",
      "levelPath": "levels/campaign/sky-134-counterintuitive-routing-test.level.json",
      "optimalMoves": 43,
      "optimalPushes": 18
    },
    {
      "position": 135,
      "levelId": "sky-135-counterintuitive-routing-recover",
      "levelPath": "levels/campaign/sky-135-counterintuitive-routing-recover.level.json",
      "optimalMoves": 20,
      "optimalPushes": 11
    },
    {
      "position": 136,
      "levelId": "sky-136-counterintuitive-routing-teach",
      "levelPath": "levels/campaign/sky-136-counterintuitive-routing-teach.level.json",
      "optimalMoves": 35,
      "optimalPushes": 16
    },
    {
      "position": 137,
      "levelId": "sky-137-counterintuitive-routing-practice",
      "levelPath": "levels/campaign/sky-137-counterintuitive-routing-practice.level.json",
      "optimalMoves": 35,
      "optimalPushes": 16
    },
    {
      "position": 138,
      "levelId": "sky-138-counterintuitive-routing-combine",
      "levelPath": "levels/campaign/sky-138-counterintuitive-routing-combine.level.json",
      "optimalMoves": 45,
      "optimalPushes": 15
    },
    {
      "position": 139,
      "levelId": "sky-139-counterintuitive-routing-test",
      "levelPath": "levels/campaign/sky-139-counterintuitive-routing-test.level.json",
      "optimalMoves": 48,
      "optimalPushes": 21
    },
    {
      "position": 140,
      "levelId": "sky-140-counterintuitive-routing-recover",
      "levelPath": "levels/campaign/sky-140-counterintuitive-routing-recover.level.json",
      "optimalMoves": 28,
      "optimalPushes": 12
    },
    {
      "position": 141,
      "levelId": "sky-141-counterintuitive-routing-teach",
      "levelPath": "levels/campaign/sky-141-counterintuitive-routing-teach.level.json",
      "optimalMoves": 41,
      "optimalPushes": 16
    },
    {
      "position": 142,
      "levelId": "sky-142-counterintuitive-routing-practice",
      "levelPath": "levels/campaign/sky-142-counterintuitive-routing-practice.level.json",
      "optimalMoves": 34,
      "optimalPushes": 16
    },
    {
      "position": 143,
      "levelId": "sky-143-counterintuitive-routing-combine",
      "levelPath": "levels/campaign/sky-143-counterintuitive-routing-combine.level.json",
      "optimalMoves": 46,
      "optimalPushes": 16
    },
    {
      "position": 144,
      "levelId": "sky-144-counterintuitive-routing-test",
      "levelPath": "levels/campaign/sky-144-counterintuitive-routing-test.level.json",
      "optimalMoves": 35,
      "optimalPushes": 18
    },
    {
      "position": 145,
      "levelId": "sky-145-counterintuitive-routing-recover",
      "levelPath": "levels/campaign/sky-145-counterintuitive-routing-recover.level.json",
      "optimalMoves": 28,
      "optimalPushes": 11
    },
    {
      "position": 146,
      "levelId": "sky-146-counterintuitive-routing-teach",
      "levelPath": "levels/campaign/sky-146-counterintuitive-routing-teach.level.json",
      "optimalMoves": 30,
      "optimalPushes": 14
    },
    {
      "position": 147,
      "levelId": "sky-147-counterintuitive-routing-practice",
      "levelPath": "levels/campaign/sky-147-counterintuitive-routing-practice.level.json",
      "optimalMoves": 33,
      "optimalPushes": 16
    },
    {
      "position": 148,
      "levelId": "sky-148-counterintuitive-routing-combine",
      "levelPath": "levels/campaign/sky-148-counterintuitive-routing-combine.level.json",
      "optimalMoves": 47,
      "optimalPushes": 18
    },
    {
      "position": 149,
      "levelId": "sky-149-counterintuitive-routing-test",
      "levelPath": "levels/campaign/sky-149-counterintuitive-routing-test.level.json",
      "optimalMoves": 46,
      "optimalPushes": 20
    },
    {
      "position": 150,
      "levelId": "sky-150-counterintuitive-routing-recover",
      "levelPath": "levels/campaign/sky-150-counterintuitive-routing-recover.level.json",
      "optimalMoves": 25,
      "optimalPushes": 10
    },
    {
      "position": 151,
      "levelId": "sky-151-multi-box-dependency-teach",
      "levelPath": "levels/campaign/sky-151-multi-box-dependency-teach.level.json",
      "optimalMoves": 33,
      "optimalPushes": 14
    },
    {
      "position": 152,
      "levelId": "sky-152-multi-box-dependency-practice",
      "levelPath": "levels/campaign/sky-152-multi-box-dependency-practice.level.json",
      "optimalMoves": 32,
      "optimalPushes": 16
    },
    {
      "position": 153,
      "levelId": "sky-153-multi-box-dependency-combine",
      "levelPath": "levels/campaign/sky-153-multi-box-dependency-combine.level.json",
      "optimalMoves": 55,
      "optimalPushes": 17
    },
    {
      "position": 154,
      "levelId": "sky-154-multi-box-dependency-test",
      "levelPath": "levels/campaign/sky-154-multi-box-dependency-test.level.json",
      "optimalMoves": 33,
      "optimalPushes": 18
    },
    {
      "position": 155,
      "levelId": "sky-155-multi-box-dependency-recover",
      "levelPath": "levels/campaign/sky-155-multi-box-dependency-recover.level.json",
      "optimalMoves": 25,
      "optimalPushes": 12
    },
    {
      "position": 156,
      "levelId": "sky-156-multi-box-dependency-teach",
      "levelPath": "levels/campaign/sky-156-multi-box-dependency-teach.level.json",
      "optimalMoves": 41,
      "optimalPushes": 16
    },
    {
      "position": 157,
      "levelId": "sky-157-multi-box-dependency-practice",
      "levelPath": "levels/campaign/sky-157-multi-box-dependency-practice.level.json",
      "optimalMoves": 51,
      "optimalPushes": 18
    },
    {
      "position": 158,
      "levelId": "sky-158-multi-box-dependency-combine",
      "levelPath": "levels/campaign/sky-158-multi-box-dependency-combine.level.json",
      "optimalMoves": 39,
      "optimalPushes": 19
    },
    {
      "position": 159,
      "levelId": "sky-159-multi-box-dependency-test",
      "levelPath": "levels/campaign/sky-159-multi-box-dependency-test.level.json",
      "optimalMoves": 36,
      "optimalPushes": 18
    },
    {
      "position": 160,
      "levelId": "sky-160-multi-box-dependency-recover",
      "levelPath": "levels/campaign/sky-160-multi-box-dependency-recover.level.json",
      "optimalMoves": 30,
      "optimalPushes": 12
    },
    {
      "position": 161,
      "levelId": "sky-161-multi-box-dependency-teach",
      "levelPath": "levels/campaign/sky-161-multi-box-dependency-teach.level.json",
      "optimalMoves": 42,
      "optimalPushes": 16
    },
    {
      "position": 162,
      "levelId": "sky-162-multi-box-dependency-practice",
      "levelPath": "levels/campaign/sky-162-multi-box-dependency-practice.level.json",
      "optimalMoves": 35,
      "optimalPushes": 17
    },
    {
      "position": 163,
      "levelId": "sky-163-multi-box-dependency-combine",
      "levelPath": "levels/campaign/sky-163-multi-box-dependency-combine.level.json",
      "optimalMoves": 37,
      "optimalPushes": 18
    },
    {
      "position": 164,
      "levelId": "sky-164-multi-box-dependency-test",
      "levelPath": "levels/campaign/sky-164-multi-box-dependency-test.level.json",
      "optimalMoves": 43,
      "optimalPushes": 20
    },
    {
      "position": 165,
      "levelId": "sky-165-multi-box-dependency-recover",
      "levelPath": "levels/campaign/sky-165-multi-box-dependency-recover.level.json",
      "optimalMoves": 29,
      "optimalPushes": 13
    },
    {
      "position": 166,
      "levelId": "sky-166-multi-box-dependency-teach",
      "levelPath": "levels/campaign/sky-166-multi-box-dependency-teach.level.json",
      "optimalMoves": 41,
      "optimalPushes": 16
    },
    {
      "position": 167,
      "levelId": "sky-167-multi-box-dependency-practice",
      "levelPath": "levels/campaign/sky-167-multi-box-dependency-practice.level.json",
      "optimalMoves": 35,
      "optimalPushes": 18
    },
    {
      "position": 168,
      "levelId": "sky-168-multi-box-dependency-combine",
      "levelPath": "levels/campaign/sky-168-multi-box-dependency-combine.level.json",
      "optimalMoves": 53,
      "optimalPushes": 18
    },
    {
      "position": 169,
      "levelId": "sky-169-multi-box-dependency-test",
      "levelPath": "levels/campaign/sky-169-multi-box-dependency-test.level.json",
      "optimalMoves": 47,
      "optimalPushes": 18
    },
    {
      "position": 170,
      "levelId": "sky-170-multi-box-dependency-recover",
      "levelPath": "levels/campaign/sky-170-multi-box-dependency-recover.level.json",
      "optimalMoves": 29,
      "optimalPushes": 13
    },
    {
      "position": 171,
      "levelId": "sky-171-multi-box-dependency-teach",
      "levelPath": "levels/campaign/sky-171-multi-box-dependency-teach.level.json",
      "optimalMoves": 40,
      "optimalPushes": 16
    },
    {
      "position": 172,
      "levelId": "sky-172-multi-box-dependency-practice",
      "levelPath": "levels/campaign/sky-172-multi-box-dependency-practice.level.json",
      "optimalMoves": 45,
      "optimalPushes": 15
    },
    {
      "position": 173,
      "levelId": "sky-173-multi-box-dependency-combine",
      "levelPath": "levels/campaign/sky-173-multi-box-dependency-combine.level.json",
      "optimalMoves": 39,
      "optimalPushes": 17
    },
    {
      "position": 174,
      "levelId": "sky-174-multi-box-dependency-test",
      "levelPath": "levels/campaign/sky-174-multi-box-dependency-test.level.json",
      "optimalMoves": 52,
      "optimalPushes": 19
    },
    {
      "position": 175,
      "levelId": "sky-175-multi-box-dependency-recover",
      "levelPath": "levels/campaign/sky-175-multi-box-dependency-recover.level.json",
      "optimalMoves": 23,
      "optimalPushes": 12
    },
    {
      "position": 176,
      "levelId": "sky-176-multi-box-dependency-teach",
      "levelPath": "levels/campaign/sky-176-multi-box-dependency-teach.level.json",
      "optimalMoves": 38,
      "optimalPushes": 16
    },
    {
      "position": 177,
      "levelId": "sky-177-multi-box-dependency-practice",
      "levelPath": "levels/campaign/sky-177-multi-box-dependency-practice.level.json",
      "optimalMoves": 40,
      "optimalPushes": 18
    },
    {
      "position": 178,
      "levelId": "sky-178-multi-box-dependency-combine",
      "levelPath": "levels/campaign/sky-178-multi-box-dependency-combine.level.json",
      "optimalMoves": 41,
      "optimalPushes": 20
    },
    {
      "position": 179,
      "levelId": "sky-179-multi-box-dependency-test",
      "levelPath": "levels/campaign/sky-179-multi-box-dependency-test.level.json",
      "optimalMoves": 36,
      "optimalPushes": 17
    },
    {
      "position": 180,
      "levelId": "sky-180-multi-box-dependency-recover",
      "levelPath": "levels/campaign/sky-180-multi-box-dependency-recover.level.json",
      "optimalMoves": 27,
      "optimalPushes": 13
    },
    {
      "position": 181,
      "levelId": "sky-181-mixed-mastery-teach",
      "levelPath": "levels/campaign/sky-181-mixed-mastery-teach.level.json",
      "optimalMoves": 36,
      "optimalPushes": 16
    },
    {
      "position": 182,
      "levelId": "sky-182-mixed-mastery-practice",
      "levelPath": "levels/campaign/sky-182-mixed-mastery-practice.level.json",
      "optimalMoves": 47,
      "optimalPushes": 18
    },
    {
      "position": 183,
      "levelId": "sky-183-mixed-mastery-combine",
      "levelPath": "levels/campaign/sky-183-mixed-mastery-combine.level.json",
      "optimalMoves": 48,
      "optimalPushes": 21
    },
    {
      "position": 184,
      "levelId": "sky-184-mixed-mastery-test",
      "levelPath": "levels/campaign/sky-184-mixed-mastery-test.level.json",
      "optimalMoves": 50,
      "optimalPushes": 19
    },
    {
      "position": 185,
      "levelId": "sky-185-mixed-mastery-recover",
      "levelPath": "levels/campaign/sky-185-mixed-mastery-recover.level.json",
      "optimalMoves": 30,
      "optimalPushes": 13
    },
    {
      "position": 186,
      "levelId": "sky-186-mixed-mastery-teach",
      "levelPath": "levels/campaign/sky-186-mixed-mastery-teach.level.json",
      "optimalMoves": 38,
      "optimalPushes": 17
    },
    {
      "position": 187,
      "levelId": "sky-187-mixed-mastery-practice",
      "levelPath": "levels/campaign/sky-187-mixed-mastery-practice.level.json",
      "optimalMoves": 44,
      "optimalPushes": 17
    },
    {
      "position": 188,
      "levelId": "sky-188-mixed-mastery-combine",
      "levelPath": "levels/campaign/sky-188-mixed-mastery-combine.level.json",
      "optimalMoves": 29,
      "optimalPushes": 18
    },
    {
      "position": 189,
      "levelId": "sky-189-mixed-mastery-test",
      "levelPath": "levels/campaign/sky-189-mixed-mastery-test.level.json",
      "optimalMoves": 53,
      "optimalPushes": 20
    },
    {
      "position": 190,
      "levelId": "sky-190-mixed-mastery-recover",
      "levelPath": "levels/campaign/sky-190-mixed-mastery-recover.level.json",
      "optimalMoves": 31,
      "optimalPushes": 13
    },
    {
      "position": 191,
      "levelId": "sky-191-mixed-mastery-teach",
      "levelPath": "levels/campaign/sky-191-mixed-mastery-teach.level.json",
      "optimalMoves": 47,
      "optimalPushes": 16
    },
    {
      "position": 192,
      "levelId": "sky-192-mixed-mastery-practice",
      "levelPath": "levels/campaign/sky-192-mixed-mastery-practice.level.json",
      "optimalMoves": 34,
      "optimalPushes": 16
    },
    {
      "position": 193,
      "levelId": "sky-193-mixed-mastery-combine",
      "levelPath": "levels/campaign/sky-193-mixed-mastery-combine.level.json",
      "optimalMoves": 41,
      "optimalPushes": 18
    },
    {
      "position": 194,
      "levelId": "sky-194-mixed-mastery-test",
      "levelPath": "levels/campaign/sky-194-mixed-mastery-test.level.json",
      "optimalMoves": 54,
      "optimalPushes": 21
    },
    {
      "position": 195,
      "levelId": "sky-195-mixed-mastery-recover",
      "levelPath": "levels/campaign/sky-195-mixed-mastery-recover.level.json",
      "optimalMoves": 28,
      "optimalPushes": 14
    },
    {
      "position": 196,
      "levelId": "sky-196-mixed-mastery-teach",
      "levelPath": "levels/campaign/sky-196-mixed-mastery-teach.level.json",
      "optimalMoves": 30,
      "optimalPushes": 15
    },
    {
      "position": 197,
      "levelId": "sky-197-mixed-mastery-practice",
      "levelPath": "levels/campaign/sky-197-mixed-mastery-practice.level.json",
      "optimalMoves": 42,
      "optimalPushes": 18
    },
    {
      "position": 198,
      "levelId": "sky-198-mixed-mastery-combine",
      "levelPath": "levels/campaign/sky-198-mixed-mastery-combine.level.json",
      "optimalMoves": 47,
      "optimalPushes": 20
    },
    {
      "position": 199,
      "levelId": "sky-199-mixed-mastery-test",
      "levelPath": "levels/campaign/sky-199-mixed-mastery-test.level.json",
      "optimalMoves": 49,
      "optimalPushes": 23
    },
    {
      "position": 200,
      "levelId": "sky-200-mixed-mastery-recover",
      "levelPath": "levels/campaign/sky-200-mixed-mastery-recover.level.json",
      "optimalMoves": 29,
      "optimalPushes": 13
    }
  ]
}
`,ra=`{
  "schema": "g-sokoban/legacy-campaign",
  "version": 1,
  "levels": [
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-31-sequencing-teach",
        "revision": 1,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#--#-#.--#",
          "#----#-.-#",
          "#--------#",
          "#--#.-#--#",
          "#--------#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 3,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 031",
          "concept": "introduce sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 21,
      "optimalPushes": 4
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-32-sequencing-practice",
        "revision": 1,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#------#",
          "#-#-.--#",
          "#-#--#-#",
          "#------#",
          "#---.--#",
          "#-##--.#",
          "#------#",
          "########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 3,
            "y": 4
          },
          {
            "x": 5,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 032",
          "concept": "practice sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 17,
      "optimalPushes": 4
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-33-sequencing-combine",
        "revision": 1,
        "width": 8,
        "height": 8,
        "terrain": [
          "########",
          "#------#",
          "#-#--#-#",
          "#---#--#",
          "#-.#.-.#",
          "#--###-#",
          "#------#",
          "########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 2,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Star Sequence 033",
          "concept": "combine sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 21,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-34-sequencing-test",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#-##-#-#-#",
          "#--#---#-#",
          "#--------#",
          "#--#.---.#",
          "#----#--.#",
          "#-----##-#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 5,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Star Sequence 034",
          "concept": "test sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 31,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-35-sequencing-recover",
        "revision": 1,
        "width": 8,
        "height": 8,
        "terrain": [
          "########",
          "#------#",
          "#-#.-#-#",
          "#------#",
          "#------#",
          "#---##-#",
          "#----.-#",
          "########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 4
          },
          {
            "x": 4,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 035",
          "concept": "sequencing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 6,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-36-sequencing-teach",
        "revision": 1,
        "width": 8,
        "height": 8,
        "terrain": [
          "########",
          "#------#",
          "#-##---#",
          "#--#.#-#",
          "#--#---#",
          "#.###--#",
          "#-.----#",
          "########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 1,
            "y": 3
          },
          {
            "x": 5,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Star Sequence 036",
          "concept": "introduce sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 34,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-37-sequencing-practice",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#-.------#",
          "#--##----#",
          "#--------#",
          "#--------#",
          "#--------#",
          "#-#-#-.--#",
          "#--###-.-#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 7,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 037",
          "concept": "practice sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 18,
      "optimalPushes": 7
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-38-sequencing-combine",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#---.-#-#",
          "#-#-#---#",
          "#--.----#",
          "#--#--#-#",
          "#--##---#",
          "#----.--#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 3,
            "y": 3
          },
          {
            "x": 6,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 038",
          "concept": "combine sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 25,
      "optimalPushes": 4
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-39-sequencing-test",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#--##-#--#",
          "#-----#--#",
          "#--##-#--#",
          "#---#----#",
          "#--------#",
          "#--#---#-#",
          "#-..-.---#",
          "##########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 5
          },
          {
            "x": 3,
            "y": 6
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Star Sequence 039",
          "concept": "test sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 26,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-40-sequencing-recover",
        "revision": 1,
        "width": 8,
        "height": 8,
        "terrain": [
          "########",
          "#------#",
          "#.-#---#",
          "#--#---#",
          "#---##-#",
          "#------#",
          "#-----.#",
          "########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 1,
            "y": 4
          },
          {
            "x": 5,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 040",
          "concept": "sequencing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 9,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-41-sequencing-teach",
        "revision": 1,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#-----.--#",
          "#.#-#----#",
          "#--#-#---#",
          "#----#-.-#",
          "#-----#--#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 1,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Star Sequence 041",
          "concept": "introduce sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 20,
      "optimalPushes": 4
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-42-sequencing-practice",
        "revision": 1,
        "width": 8,
        "height": 10,
        "terrain": [
          "########",
          "#--.---#",
          "#--##--#",
          "#--#-#-#",
          "#-##.--#",
          "#------#",
          "#--#---#",
          "#-##.--#",
          "#------#",
          "########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 1
          },
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 5,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 042",
          "concept": "practice sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 15,
      "optimalPushes": 5
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-43-sequencing-combine",
        "revision": 1,
        "width": 8,
        "height": 10,
        "terrain": [
          "########",
          "#----.-#",
          "#-#----#",
          "#----#.#",
          "#---##-#",
          "#-#-#--#",
          "#------#",
          "#----#-#",
          "#-.----#",
          "########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 6,
            "y": 2
          }
        ],
        "metadata": {
          "title": "Star Sequence 043",
          "concept": "combine sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 22,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-44-sequencing-test",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#-.----.-#",
          "#-#----#-#",
          "#---###--#",
          "#--------#",
          "#--#-----#",
          "#-.---##-#",
          "#--###---#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 4,
            "y": 4
          },
          {
            "x": 3,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 044",
          "concept": "test sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 57,
      "optimalPushes": 15
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-45-sequencing-recover",
        "revision": 1,
        "width": 8,
        "height": 8,
        "terrain": [
          "########",
          "#-.----#",
          "#--.---#",
          "#--#---#",
          "#-##---#",
          "#---#--#",
          "#------#",
          "########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 1
          },
          {
            "x": 4,
            "y": 2
          }
        ],
        "metadata": {
          "title": "Star Sequence 045",
          "concept": "sequencing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 6,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-46-sequencing-teach",
        "revision": 1,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#--#--.--#",
          "#-#--.-#-#",
          "#----#---#",
          "#-#-#----#",
          "#----#-#.#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 8,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Star Sequence 046",
          "concept": "introduce sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 18,
      "optimalPushes": 4
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-47-sequencing-practice",
        "revision": 1,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#---.----#",
          "#----#---#",
          "#--------#",
          "#----#-.-#",
          "#--###-#.#",
          "#--------#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 8,
            "y": 2
          },
          {
            "x": 3,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Star Sequence 047",
          "concept": "practice sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 20,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-48-sequencing-combine",
        "revision": 1,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#-.----#",
          "#-#-##-#",
          "#----#-#",
          "#------#",
          "#-#-#--#",
          "#-#-##.#",
          "#--.---#",
          "########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 3,
            "y": 4
          },
          {
            "x": 6,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Star Sequence 048",
          "concept": "combine sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 23,
      "optimalPushes": 7
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-49-sequencing-test",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#-----.-.#",
          "#-#----#.#",
          "#---#----#",
          "#--#---#-#",
          "#-#------#",
          "#---##---#",
          "#-##-----#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 1
          },
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 5,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Star Sequence 049",
          "concept": "test sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 44,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-50-sequencing-recover",
        "revision": 1,
        "width": 8,
        "height": 8,
        "terrain": [
          "########",
          "#------#",
          "#----.-#",
          "#-#-#--#",
          "#-#-#--#",
          "#------#",
          "#-----.#",
          "########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 6,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Star Sequence 050",
          "concept": "sequencing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 5,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-51-sequencing-teach",
        "revision": 1,
        "width": 9,
        "height": 8,
        "terrain": [
          "#########",
          "#-------#",
          "#----##-#",
          "#-#.#---#",
          "#-#-----#",
          "#----#.-#",
          "#-.-----#",
          "#########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 4,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Star Sequence 051",
          "concept": "introduce sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 23,
      "optimalPushes": 5
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-52-sequencing-practice",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#--------#",
          "#-#------#",
          "#------#-#",
          "#--#-----#",
          "#-.##-#--#",
          "#-.------#",
          "#.-------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 1,
            "y": 7
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Star Sequence 052",
          "concept": "practice sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 19,
      "optimalPushes": 5
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-53-sequencing-combine",
        "revision": 1,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#------#",
          "#-#-##-#",
          "#------#",
          "#-#.##-#",
          "#-.#---#",
          "#------#",
          "#.-----#",
          "########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 2,
            "y": 6
          },
          {
            "x": 2,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Star Sequence 053",
          "concept": "combine sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 21,
      "optimalPushes": 4
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-54-sequencing-test",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#--#--##-#",
          "#--------#",
          "#-##-----#",
          "#--###---#",
          "#--#-----#",
          "#--#-----#",
          "#-.--.-.-#",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 3
          },
          {
            "x": 6,
            "y": 6
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Star Sequence 054",
          "concept": "test sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 33,
      "optimalPushes": 14
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-55-sequencing-recover",
        "revision": 1,
        "width": 8,
        "height": 8,
        "terrain": [
          "########",
          "#------#",
          "#------#",
          "#----#-#",
          "#---.--#",
          "#-###--#",
          "#-.----#",
          "########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 3,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 055",
          "concept": "sequencing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 7,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-56-sequencing-teach",
        "revision": 1,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#------#",
          "#-###--#",
          "#--#.--#",
          "#.-##--#",
          "#--##--#",
          "#----#-#",
          "#-.----#",
          "########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 1,
            "y": 5
          },
          {
            "x": 2,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 056",
          "concept": "introduce sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 17,
      "optimalPushes": 4
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-57-sequencing-practice",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#----.---#",
          "#--#--#--#",
          "#--------#",
          "#-----#--#",
          "#-#-#-#.-#",
          "#--#-.---#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 5,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Star Sequence 057",
          "concept": "practice sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 17,
      "optimalPushes": 6
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-58-sequencing-combine",
        "revision": 1,
        "width": 8,
        "height": 10,
        "terrain": [
          "########",
          "#------#",
          "#-#--..#",
          "#-#-#--#",
          "#---#-.#",
          "#-##---#",
          "#-#--#-#",
          "#------#",
          "#------#",
          "########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 3
          },
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 5,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Star Sequence 058",
          "concept": "combine sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 20,
      "optimalPushes": 4
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-59-sequencing-test",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#---.----#",
          "#-##-##--#",
          "#-#------#",
          "#-.----#-#",
          "#-.------#",
          "#--#-----#",
          "#--###---#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 2,
            "y": 7
          },
          {
            "x": 7,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Star Sequence 059",
          "concept": "test sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 39,
      "optimalPushes": 17
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-60-sequencing-recover",
        "revision": 1,
        "width": 8,
        "height": 8,
        "terrain": [
          "########",
          "#------#",
          "#--#.#.#",
          "#------#",
          "#-#----#",
          "#----#-#",
          "#------#",
          "########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 4,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Star Sequence 060",
          "concept": "sequencing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 9,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-61-staging-order-teach",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#---#--#-#",
          "#-----##-#",
          "#--###---#",
          "#---##--.#",
          "#--------#",
          "#--------#",
          "#-.----.-#",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 7,
            "y": 6
          },
          {
            "x": 3,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 061",
          "concept": "introduce staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 13,
      "optimalPushes": 5
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-62-staging-order-practice",
        "revision": 1,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#-----.--#",
          "#---##---#",
          "#------#-#",
          "#.-#----.#",
          "#--------#",
          "#---#-#--#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 8,
            "y": 2
          },
          {
            "x": 5,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Starlight Stage 062",
          "concept": "practice staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 27,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-63-staging-order-combine",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#--.--#--#",
          "#-##---#-#",
          "#-##-----#",
          "#--#--##-#",
          "#-#-----.#",
          "#-.------#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 8,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Starlight Stage 063",
          "concept": "combine staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 46,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-65-staging-order-recover",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#------.#",
          "#----##-#",
          "#-------#",
          "#---#---#",
          "#-#-----#",
          "#-#-----#",
          "#---.---#",
          "#########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 1
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 065",
          "concept": "staging-order recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 10,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-66-staging-order-teach",
        "revision": 1,
        "width": 9,
        "height": 10,
        "terrain": [
          "#########",
          "#-------#",
          "#---##.-#",
          "#--#-#--#",
          "#--#---.#",
          "#----##-#",
          "#--##---#",
          "#-------#",
          "#----.--#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 066",
          "concept": "introduce staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 18,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-67-staging-order-practice",
        "revision": 1,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#.-------#",
          "#.----.--#",
          "#-#--#-#-#",
          "#---###--#",
          "#--------#",
          "#------#-#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 1,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Starlight Stage 067",
          "concept": "practice staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 20,
      "optimalPushes": 4
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-68-staging-order-combine",
        "revision": 1,
        "width": 9,
        "height": 10,
        "terrain": [
          "#########",
          "#-------#",
          "#-###---#",
          "#-------#",
          "#-##--#-#",
          "#----#--#",
          "#.-#----#",
          "#--#----#",
          "#----.-.#",
          "#########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 6
          },
          {
            "x": 2,
            "y": 7
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 068",
          "concept": "combine staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 33,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-69-staging-order-test",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#------#.#",
          "#--#-.-#-#",
          "#--##----#",
          "#-###-##-#",
          "#--------#",
          "#-#-#----#",
          "#----.---#",
          "##########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 7,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 069",
          "concept": "test staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 46,
      "optimalPushes": 13
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-70-staging-order-recover",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#--#----#",
          "#----#--#",
          "#--###-.#",
          "#-------#",
          "#---.---#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 3,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Starlight Stage 070",
          "concept": "staging-order recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 11,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-71-staging-order-teach",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#------.-#",
          "#----#---#",
          "#-##--#.-#",
          "#--------#",
          "#-----##-#",
          "#-##-----#",
          "#--.#----#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 1
          },
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 2,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 071",
          "concept": "introduce staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 25,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-72-staging-order-practice",
        "revision": 1,
        "width": 9,
        "height": 10,
        "terrain": [
          "#########",
          "#-----.-#",
          "#--#-##-#",
          "#---#-#-#",
          "#-------#",
          "#----#--#",
          "#-##-.--#",
          "#----#-.#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 1
          },
          {
            "x": 6,
            "y": 6
          },
          {
            "x": 7,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Starlight Stage 072",
          "concept": "practice staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 26,
      "optimalPushes": 4
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-73-staging-order-combine",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#-----#-#",
          "#.---##-#",
          "#--##---#",
          "#--#-#-.#",
          "#-------#",
          "#--.----#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 1,
            "y": 5
          },
          {
            "x": 3,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Starlight Stage 073",
          "concept": "combine staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 29,
      "optimalPushes": 13
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-74-staging-order-test",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#.-#-#-#-#",
          "#-#----#.#",
          "#-.------#",
          "#-#----#-#",
          "#-----#--#",
          "#-##-#-#-#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 3
          },
          {
            "x": 4,
            "y": 4
          },
          {
            "x": 5,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Starlight Stage 074",
          "concept": "test staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 51,
      "optimalPushes": 14
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-75-staging-order-recover",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#--.----#",
          "#-#---.-#",
          "#----##-#",
          "#-#-----#",
          "#----#--#",
          "#-------#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 3,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Starlight Stage 075",
          "concept": "staging-order recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 7,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-76-staging-order-teach",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#.-------#",
          "#--#-----#",
          "#---#-##-#",
          "#---.##--#",
          "#--------#",
          "#--#-#-#-#",
          "#--------#",
          "#-----.--#",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 1,
            "y": 3
          },
          {
            "x": 3,
            "y": 4
          },
          {
            "x": 4,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Starlight Stage 076",
          "concept": "introduce staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 19,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-77-staging-order-practice",
        "revision": 1,
        "width": 9,
        "height": 10,
        "terrain": [
          "#########",
          "#----.--#",
          "#---#---#",
          "#--#-#--#",
          "#----#--#",
          "#--#-.-.#",
          "#-----#-#",
          "#-------#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 077",
          "concept": "practice staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 34,
      "optimalPushes": 6
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-78-staging-order-combine",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--.-----#",
          "#-##-----#",
          "#.----#--#",
          "#--------#",
          "#---#----#",
          "#-----.--#",
          "#-#--#-#-#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 7,
            "y": 3
          },
          {
            "x": 3,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Starlight Stage 078",
          "concept": "combine staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 26,
      "optimalPushes": 11
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-80-staging-order-recover",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#-----#-#",
          "#-#-----#",
          "#---.-#-#",
          "#--#-#--#",
          "#-------#",
          "#.------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 3,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 080",
          "concept": "staging-order recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 5,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-81-staging-order-teach",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#------.-#",
          "#--#-##--#",
          "#--------#",
          "#.#-#--#-#",
          "#--.-----#",
          "#--#--##-#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 4,
            "y": 4
          },
          {
            "x": 3,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Starlight Stage 081",
          "concept": "introduce staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 18,
      "optimalPushes": 6
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-82-staging-order-practice",
        "revision": 1,
        "width": 9,
        "height": 10,
        "terrain": [
          "#########",
          "#-------#",
          "#-------#",
          "#-------#",
          "#----#--#",
          "#--#-#.-#",
          "#-.-.-#-#",
          "#-##----#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 2,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Starlight Stage 082",
          "concept": "practice staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 13,
      "optimalPushes": 5
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-83-staging-order-combine",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#---#---#",
          "#--#-#--#",
          "#-..-#--#",
          "#--##.#-#",
          "#---#---#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 6,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Starlight Stage 083",
          "concept": "combine staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 25,
      "optimalPushes": 5
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-84-staging-order-test",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#---##-#-#",
          "#-##-#---#",
          "#--#-#--.#",
          "#-----#-.#",
          "#-##-----#",
          "#------#.#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 3
          },
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 5,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Starlight Stage 084",
          "concept": "test staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 31,
      "optimalPushes": 9
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-85-staging-order-recover",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#-------#",
          "#-------#",
          "#--##---#",
          "#-#---#-#",
          "#--#--.-#",
          "#------.#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 6
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 085",
          "concept": "staging-order recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 5,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-86-staging-order-teach",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#-###--.#",
          "#-------#",
          "#-------#",
          "#---##--#",
          "#--#--#-#",
          "#-.----.#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 3,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 086",
          "concept": "introduce staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 24,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-87-staging-order-practice",
        "revision": 1,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#---#--#-#",
          "#---.-.--#",
          "#------#-#",
          "#--#--#--#",
          "#--#-#---#",
          "#-------.#",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 3
          },
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 7,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 087",
          "concept": "practice staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 19,
      "optimalPushes": 4
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-88-staging-order-combine",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#-#-#--#-#",
          "#--#-##--#",
          "#--#--#--#",
          "#---#----#",
          "#--------#",
          "#--------#",
          "#-.--.-.-#",
          "##########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 7,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 088",
          "concept": "combine staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 22,
      "optimalPushes": 9
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-90-staging-order-recover",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#----#--#",
          "#--#----#",
          "#.#-.---#",
          "#--#----#",
          "#--#----#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 1,
            "y": 2
          },
          {
            "x": 5,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Starlight Stage 090",
          "concept": "staging-order recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 11,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-91-congestion-teach",
        "revision": 1,
        "width": 9,
        "height": 10,
        "terrain": [
          "#########",
          "#-.-----#",
          "#-------#",
          "#-----#-#",
          "#---#-#-#",
          "#--##-#-#",
          "#--#----#",
          "#.-.----#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 2,
            "y": 6
          },
          {
            "x": 2,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Cloud Junction 091",
          "concept": "introduce congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 33,
      "optimalPushes": 7
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-92-congestion-practice",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-----.-#",
          "#-####--#",
          "#-##----#",
          "#---###-#",
          "#-#---#-#",
          "#-..----#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 4,
            "y": 6
          },
          {
            "x": 6,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Cloud Junction 092",
          "concept": "practice congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 19,
      "optimalPushes": 6
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-93-congestion-combine",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#--##---#",
          "#-#-----#",
          "#-------#",
          "#----#.-#",
          "#--###.-#",
          "#-.-----#",
          "#########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 4,
            "y": 4
          },
          {
            "x": 2,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Cloud Junction 093",
          "concept": "combine congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 24,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-95-congestion-recover",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-.-----#",
          "#-------#",
          "#--#-##.#",
          "#-------#",
          "#--#----#",
          "#--#-#--#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 7,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Cloud Junction 095",
          "concept": "congestion recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 8,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-96-congestion-teach",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#-#--#---#",
          "#--.---#-#",
          "#------#-#",
          "#--.#----#",
          "#--.-##--#",
          "#---#----#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 2,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Cloud Junction 096",
          "concept": "introduce congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 14,
      "optimalPushes": 5
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-97-congestion-practice",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#-----#-#",
          "#-#-#---#",
          "#--#-##.#",
          "#-#--##.#",
          "#--#--.-#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 7,
            "y": 3
          },
          {
            "x": 5,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Cloud Junction 097",
          "concept": "practice congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 34,
      "optimalPushes": 5
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-98-congestion-combine",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#--#-#-#-#",
          "#--#-#---#",
          "#---#----#",
          "#-.-#----#",
          "#-.-#----#",
          "#-#------#",
          "#----.---#",
          "##########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 7,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Cloud Junction 098",
          "concept": "combine congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 28,
      "optimalPushes": 9
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-100-congestion-recover",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#-------#",
          "#--#----#",
          "#---#-#-#",
          "#--#-##-#",
          "#----.--#",
          "#------.#",
          "#########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 6
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Cloud Junction 100",
          "concept": "congestion recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 4,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-101-congestion-teach",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#---.----#",
          "#------.-#",
          "#---###-.#",
          "#--#-----#",
          "#-#-#--#-#",
          "#----##--#",
          "#-##-----#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 7,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Cloud Junction 101",
          "concept": "introduce congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 38,
      "optimalPushes": 9
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-102-congestion-practice",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#------#-#",
          "#.----#--#",
          "#.#--#---#",
          "#---##-#-#",
          "#--#-----#",
          "#-.---##-#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 3,
            "y": 4
          },
          {
            "x": 3,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Cloud Junction 102",
          "concept": "practice congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 24,
      "optimalPushes": 7
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-103-congestion-combine",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#--------#",
          "#---.-.#-#",
          "#------#-#",
          "#----###-#",
          "#------#-#",
          "#--#.----#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Cloud Junction 103",
          "concept": "combine congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 31,
      "optimalPushes": 7
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-105-congestion-recover",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#---.---#",
          "#-#-----#",
          "#----#--#",
          "#--#----#",
          "#--##---#",
          "#-.#----#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 2,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Cloud Junction 105",
          "concept": "congestion recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 7,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-106-congestion-teach",
        "revision": 1,
        "width": 9,
        "height": 10,
        "terrain": [
          "#########",
          "#-----.-#",
          "#----##-#",
          "#--###--#",
          "#-------#",
          "#.------#",
          "#-.#----#",
          "#-##-#--#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 1
          },
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 4,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Cloud Junction 106",
          "concept": "introduce congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 18,
      "optimalPushes": 9
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-107-congestion-practice",
        "revision": 1,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#----.-.-#",
          "#--------#",
          "#-#-#----#",
          "#-#------#",
          "#--#.--#-#",
          "#-#--###-#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 1
          },
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 4,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Cloud Junction 107",
          "concept": "practice congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 30,
      "optimalPushes": 9
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-108-congestion-combine",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#------..#",
          "#--------#",
          "#--------#",
          "#-#----#-#",
          "#-#----#-#",
          "#-#-#----#",
          "#-#------#",
          "#-------.#",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 7,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Cloud Junction 108",
          "concept": "combine congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 29,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-110-congestion-recover",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#-----#-#",
          "#-#--#--#",
          "#-----#-#",
          "#--#----#",
          "#----#-.#",
          "#-----.-#",
          "#########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 6,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Cloud Junction 110",
          "concept": "congestion recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 4,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-111-congestion-teach",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#.----.--#",
          "#---#--.-#",
          "#--####--#",
          "#-----#--#",
          "#-#--#---#",
          "#-#------#",
          "#------#-#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 1
          },
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 7,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Cloud Junction 111",
          "concept": "introduce congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 26,
      "optimalPushes": 9
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-112-congestion-practice",
        "revision": 1,
        "width": 9,
        "height": 10,
        "terrain": [
          "#########",
          "#-------#",
          "#-------#",
          "#-..#---#",
          "#---#---#",
          "#-#--#--#",
          "#-#--.--#",
          "#---#-#-#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Cloud Junction 112",
          "concept": "practice congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 31,
      "optimalPushes": 9
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-113-congestion-combine",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#-.------#",
          "#---#-#--#",
          "#--.##---#",
          "#--#--.#-#",
          "#--###---#",
          "#----#-#-#",
          "#--------#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 2,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Cloud Junction 113",
          "concept": "combine congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 32,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-115-congestion-recover",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#------.#",
          "#-#-#-#-#",
          "#-------#",
          "#----#--#",
          "#---.---#",
          "#--#-#--#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 6,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Cloud Junction 115",
          "concept": "congestion recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 7,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-116-congestion-teach",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#-------.#",
          "#-#-#----#",
          "#-.------#",
          "#-.------#",
          "#-##---#-#",
          "#-###-#--#",
          "#-#------#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 3,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Cloud Junction 116",
          "concept": "introduce congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 18,
      "optimalPushes": 7
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-117-congestion-practice",
        "revision": 1,
        "width": 9,
        "height": 10,
        "terrain": [
          "#########",
          "#-------#",
          "#--#----#",
          "#--#-##-#",
          "#--#----#",
          "#-..#---#",
          "#-------#",
          "#--#--#-#",
          "#-.-----#",
          "#########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 2,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Cloud Junction 117",
          "concept": "practice congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 17,
      "optimalPushes": 6
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-118-congestion-combine",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#--#--##-#",
          "#--.-----#",
          "#------#-#",
          "#----#-.-#",
          "#-##-#---#",
          "#--#.----#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 6,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Cloud Junction 118",
          "concept": "combine congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 37,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-120-congestion-recover",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-----.-#",
          "#-#--#--#",
          "#-#----.#",
          "#-----#-#",
          "#----#--#",
          "#---#---#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 1
          },
          {
            "x": 7,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Cloud Junction 120",
          "concept": "congestion recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 17,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-121-counterintuitive-routing-teach",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#--------#",
          "#--#----.#",
          "#-##-#-#-#",
          "#-----#--#",
          "#-#-.#---#",
          "#--####--#",
          "#----.---#",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 3,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Far Orbit 121",
          "concept": "introduce counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 40,
      "optimalPushes": 9
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-122-counterintuitive-routing-practice",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#--#-#---#",
          "#---#--#-#",
          "#--#---#-#",
          "#----#---#",
          "#.----#-.#",
          "#-###---.#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 6,
            "y": 7
          },
          {
            "x": 7,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Far Orbit 122",
          "concept": "practice counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 43,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-123-counterintuitive-routing-combine",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#-.------#",
          "#------#-#",
          "#-##-#.--#",
          "#--#####-#",
          "#-#-----.#",
          "#--------#",
          "#-##-----#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 7,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Far Orbit 123",
          "concept": "combine counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 36,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-124-counterintuitive-routing-test",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#-------.#",
          "#--#.#-#-#",
          "#.##-#---#",
          "#-----##-#",
          "#-#------#",
          "#--#-#---#",
          "#--#-#-#-#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 1,
            "y": 2
          },
          {
            "x": 7,
            "y": 3
          },
          {
            "x": 4,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Far Orbit 124",
          "concept": "test counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 39,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-125-counterintuitive-routing-recover",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-----.-#",
          "#--#----#",
          "#-#--#--#",
          "#.-##---#",
          "#-------#",
          "#-##----#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 1,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Far Orbit 125",
          "concept": "counterintuitive-routing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 16,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-126-counterintuitive-routing-teach",
        "revision": 1,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#-----#--#",
          "#--#####-#",
          "#----.---#",
          "#.#------#",
          "#-##---#-#",
          "#------.-#",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 1,
            "y": 6
          },
          {
            "x": 4,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Far Orbit 126",
          "concept": "introduce counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 22,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-127-counterintuitive-routing-practice",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#--#-----#",
          "#--#--#--#",
          "#-###-#--#",
          "#-.----#-#",
          "#--#-###-#",
          "#------#-#",
          "#-..-----#",
          "##########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 6
          },
          {
            "x": 2,
            "y": 7
          },
          {
            "x": 4,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Far Orbit 127",
          "concept": "practice counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 36,
      "optimalPushes": 6
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-128-counterintuitive-routing-combine",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#.----.-#",
          "#-#--#--#",
          "#---#-#-#",
          "#-##----#",
          "#-#---#-#",
          "#-##--#-#",
          "#---.---#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 1
          },
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 4,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Far Orbit 128",
          "concept": "combine counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 43,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-130-counterintuitive-routing-recover",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#-.##-.-#",
          "#--##---#",
          "#----#--#",
          "#-#-----#",
          "#----#--#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 6,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Far Orbit 130",
          "concept": "counterintuitive-routing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 9,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-132-counterintuitive-routing-practice",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#--#--#-#",
          "#-----#-#",
          "#-#--.#-#",
          "#.-#-##-#",
          "#-#-##--#",
          "#----.--#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 4,
            "y": 4
          },
          {
            "x": 2,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Far Orbit 132",
          "concept": "practice counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 38,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-133-counterintuitive-routing-combine",
        "revision": 1,
        "width": 9,
        "height": 8,
        "terrain": [
          "#########",
          "#-------#",
          "#-##-#--#",
          "#-#-#---#",
          "#---#-.-#",
          "#-#--##.#",
          "#------.#",
          "#########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 4,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Far Orbit 133",
          "concept": "combine counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 60,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-135-counterintuitive-routing-recover",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#-##----#",
          "#-----.-#",
          "#--#----#",
          "#----##-#",
          "#--#--#.#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 7,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Far Orbit 135",
          "concept": "counterintuitive-routing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 8,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-137-counterintuitive-routing-practice",
        "revision": 1,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#-------.#",
          "#.-###-#-#",
          "#---###--#",
          "#-##---#-#",
          "#-----#--#",
          "#--#.-##-#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 8,
            "y": 2
          },
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 4,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Far Orbit 137",
          "concept": "practice counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 38,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-140-counterintuitive-routing-recover",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#---.---#",
          "#-#.--#-#",
          "#-----#-#",
          "#-#-----#",
          "#-#-----#",
          "#-#---#-#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 3,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Far Orbit 140",
          "concept": "counterintuitive-routing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 4,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-141-counterintuitive-routing-teach",
        "revision": 1,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#---.-.--#",
          "#-#--#---#",
          "#----#---#",
          "#-#-#----#",
          "#--#####-#",
          "#---###--#",
          "#-----.--#",
          "##########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Far Orbit 141",
          "concept": "introduce counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 38,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-142-counterintuitive-routing-practice",
        "revision": 1,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--.-----#",
          "#----##--#",
          "#.-###-#-#",
          "#--#---#-#",
          "#--#-###-#",
          "#-#--#---#",
          "#--.-----#",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 1
          },
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 4,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Far Orbit 142",
          "concept": "practice counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 59,
      "optimalPushes": 14
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-144-counterintuitive-routing-test",
        "revision": 1,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#--.--.#",
          "#--#-#-#",
          "#--#---#",
          "#---##.#",
          "#-#----#",
          "#----#-#",
          "#------#",
          "########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 5,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Far Orbit 144",
          "concept": "test counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 57,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-145-counterintuitive-routing-recover",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#.-#-#--#",
          "#-##----#",
          "#-#---#-#",
          "#---#---#",
          "#-------#",
          "#--.----#",
          "#########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 1,
            "y": 4
          },
          {
            "x": 3,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Far Orbit 145",
          "concept": "counterintuitive-routing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 7,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-146-counterintuitive-routing-teach",
        "revision": 1,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#--#---#.#",
          "#-----#--#",
          "#-#-.----#",
          "#--#####-#",
          "#-####---#",
          "#----.---#",
          "##########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 6,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Far Orbit 146",
          "concept": "introduce counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 47,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-147-counterintuitive-routing-practice",
        "revision": 1,
        "width": 9,
        "height": 10,
        "terrain": [
          "#########",
          "#----.--#",
          "#-###---#",
          "#-#-#---#",
          "#.#-#-#-#",
          "#-#---#-#",
          "#-#-----#",
          "#-#-##--#",
          "#-.-----#",
          "#########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 1,
            "y": 5
          },
          {
            "x": 4,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Far Orbit 147",
          "concept": "practice counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 48,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-148-counterintuitive-routing-combine",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#-.####-#",
          "#---###-#",
          "#----.#-#",
          "#--###-.#",
          "#-------#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 4
          },
          {
            "x": 2,
            "y": 6
          },
          {
            "x": 5,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Far Orbit 148",
          "concept": "combine counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 30,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-149-counterintuitive-routing-test",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#--####-#",
          "#.-.---.#",
          "#-----#-#",
          "#--####-#",
          "#--###--#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 2,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Far Orbit 149",
          "concept": "test counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 23,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-150-counterintuitive-routing-recover",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#--.----#",
          "#---#---#",
          "#-------#",
          "#-------#",
          "#.###---#",
          "#--##-#-#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 3
          },
          {
            "x": 1,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Far Orbit 150",
          "concept": "counterintuitive-routing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 5,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-152-multi-box-dependency-practice",
        "revision": 1,
        "width": 9,
        "height": 10,
        "terrain": [
          "#########",
          "#------.#",
          "#---#---#",
          "#---#-#-#",
          "#.--.##-#",
          "#--#----#",
          "#--#--#-#",
          "#---#---#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 2,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Linked Observatory 152",
          "concept": "practice multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 38,
      "optimalPushes": 9
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-153-multi-box-dependency-combine",
        "revision": 1,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#-----.--#",
          "#---##---#",
          "#--#-----#",
          "#-----#.-#",
          "#--#-##--#",
          "#----#-#-#",
          "#-------.#",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 1
          },
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Linked Observatory 153",
          "concept": "combine multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 51,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-154-multi-box-dependency-test",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#-.------#",
          "#---#-##-#",
          "#-----##-#",
          "#-#####--#",
          "#-#-#--#-#",
          "#-#-----.#",
          "#-----.#-#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 8,
            "y": 3
          },
          {
            "x": 3,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Linked Observatory 154",
          "concept": "test multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 89,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-155-multi-box-dependency-recover",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#--#.--.#",
          "#-##--#-#",
          "#-----#-#",
          "#--#--#-#",
          "#---#---#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 4,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Linked Observatory 155",
          "concept": "multi-box-dependency recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 7,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-156-multi-box-dependency-teach",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#------#-#",
          "#-#.-###.#",
          "#-#------#",
          "#-----#--#",
          "#-#------#",
          "#-#-.-##-#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 7,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Linked Observatory 156",
          "concept": "introduce multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 23,
      "optimalPushes": 11
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-157-multi-box-dependency-practice",
        "revision": 1,
        "width": 9,
        "height": 10,
        "terrain": [
          "#########",
          "#--.--.-#",
          "#-#-##--#",
          "#-#-#.--#",
          "#-#---#-#",
          "#-#--##-#",
          "#---#---#",
          "#-#-#---#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 3,
            "y": 4
          },
          {
            "x": 4,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Linked Observatory 157",
          "concept": "practice multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 71,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-160-multi-box-dependency-recover",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#--#-.#-#",
          "#-#-----#",
          "#-#-----#",
          "#----#--#",
          "#-#-#-#-#",
          "#----.--#",
          "#########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 4,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Linked Observatory 160",
          "concept": "multi-box-dependency recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 14,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-161-multi-box-dependency-teach",
        "revision": 1,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#-##-----#",
          "#-##--#--#",
          "#--##-.-.#",
          "#---##---#",
          "#-.---#--#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 4,
            "y": 6
          },
          {
            "x": 7,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Linked Observatory 161",
          "concept": "introduce multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 33,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-162-multi-box-dependency-practice",
        "revision": 1,
        "width": 9,
        "height": 10,
        "terrain": [
          "#########",
          "#.------#",
          "#-###---#",
          "#----#--#",
          "#----#--#",
          "#-#-.---#",
          "#-##--#-#",
          "#-#---#-#",
          "#---.---#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 3,
            "y": 4
          },
          {
            "x": 4,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Linked Observatory 162",
          "concept": "practice multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 18,
      "optimalPushes": 7
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-163-multi-box-dependency-combine",
        "revision": 1,
        "width": 9,
        "height": 10,
        "terrain": [
          "#########",
          "#.------#",
          "#--#--#-#",
          "#---#-.-#",
          "#--.#---#",
          "#-#--#--#",
          "#-##-#--#",
          "#--###--#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 6,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Linked Observatory 163",
          "concept": "combine multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 45,
      "optimalPushes": 9
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-164-multi-box-dependency-test",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#-######-#",
          "#-##-----#",
          "#---#----#",
          "#--------#",
          "#--..###-#",
          "#---##---#",
          "#.-------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 2,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Linked Observatory 164",
          "concept": "test multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 29,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-165-multi-box-dependency-recover",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#---##--#",
          "#----.#-#",
          "#-#-----#",
          "#.---#--#",
          "#-##--#-#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 4
          },
          {
            "x": 2,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Linked Observatory 165",
          "concept": "multi-box-dependency recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 10,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-166-multi-box-dependency-teach",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#.----.-#",
          "#-###---#",
          "#-#-#---#",
          "#-#-#.#-#",
          "#----#--#",
          "#-#--##-#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 1
          },
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 6,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Linked Observatory 166",
          "concept": "introduce multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 34,
      "optimalPushes": 7
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-167-multi-box-dependency-practice",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#.-------#",
          "#-#------#",
          "#--#-#-#-#",
          "#---#--#-#",
          "#--#--.--#",
          "#-##---#-#",
          "#-.------#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 5,
            "y": 6
          },
          {
            "x": 4,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Linked Observatory 167",
          "concept": "practice multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 25,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-168-multi-box-dependency-combine",
        "revision": 1,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#------#",
          "#-##---#",
          "#---.--#",
          "#-#-#--#",
          "#--###-#",
          "#-##---#",
          "#-.---.#",
          "########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 3
          },
          {
            "x": 6,
            "y": 5
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Linked Observatory 168",
          "concept": "combine multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 55,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-169-multi-box-dependency-test",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--.-----#",
          "#--.-----#",
          "#---##-#-#",
          "#--####--#",
          "#---#--#-#",
          "#--###---#",
          "#-----##.#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 8,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Linked Observatory 169",
          "concept": "test multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 30,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-170-multi-box-dependency-recover",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#----.--#",
          "#-.---#-#",
          "#-#--#--#",
          "#---#---#",
          "#--#----#",
          "#-##--#-#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 1
          },
          {
            "x": 3,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Linked Observatory 170",
          "concept": "multi-box-dependency recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 13,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-171-multi-box-dependency-teach",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#.------#",
          "#-#---#-#",
          "#--.#---#",
          "#--.-##-#",
          "#-#-----#",
          "#--#-##-#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 2,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Linked Observatory 171",
          "concept": "introduce multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 33,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-172-multi-box-dependency-practice",
        "revision": 1,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#-----#--#",
          "#-##-----#",
          "#---#----#",
          "#-#-####-#",
          "#.#------#",
          "#.-.-----#",
          "##########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 3,
            "y": 5
          },
          {
            "x": 6,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Linked Observatory 172",
          "concept": "practice multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 37,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-173-multi-box-dependency-combine",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#--##---#",
          "#--.##--#",
          "#---.#.-#",
          "#--####-#",
          "#--#-#--#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 3,
            "y": 4
          },
          {
            "x": 2,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Linked Observatory 173",
          "concept": "combine multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 27,
      "optimalPushes": 9
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-174-multi-box-dependency-test",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#-#####--#",
          "#-###----#",
          "#-#-#----#",
          "#--------#",
          "#--###-#-#",
          "#--.---.-#",
          "#----.---#",
          "##########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 4,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Linked Observatory 174",
          "concept": "test multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 53,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-175-multi-box-dependency-recover",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#-#-#-#-#",
          "#-----.-#",
          "#-#-#---#",
          "#----#--#",
          "#-##----#",
          "#---.---#",
          "#########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 5
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Linked Observatory 175",
          "concept": "multi-box-dependency recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 5,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-176-multi-box-dependency-teach",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#-##---#-#",
          "#-.##--#-#",
          "#---##-#-#",
          "#---.--#-#",
          "#--##----#",
          "#------#-#",
          "#--.-----#",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 2,
            "y": 6
          },
          {
            "x": 6,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Linked Observatory 176",
          "concept": "introduce multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 27,
      "optimalPushes": 7
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-177-multi-box-dependency-practice",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#-#------#",
          "#-#----#-#",
          "#----#---#",
          "#-###----#",
          "#-#---.--#",
          "#---#-.#.#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 4,
            "y": 6
          },
          {
            "x": 7,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Linked Observatory 177",
          "concept": "practice multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 21,
      "optimalPushes": 7
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-178-multi-box-dependency-combine",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-----.-#",
          "#-##----#",
          "#-#--#--#",
          "#-----#.#",
          "#-#--##-#",
          "#--#-##-#",
          "#------.#",
          "#########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 6,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Linked Observatory 178",
          "concept": "combine multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 43,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-179-multi-box-dependency-test",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#---##-#-#",
          "#-----#--#",
          "#--#--##-#",
          "#.##-----#",
          "#-##-.-.-#",
          "#-###-#--#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 6,
            "y": 5
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Linked Observatory 179",
          "concept": "test multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 58,
      "optimalPushes": 14
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-180-multi-box-dependency-recover",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#-.-#---#",
          "#--#---.#",
          "#----##-#",
          "#--#-#--#",
          "#----##-#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 2,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Linked Observatory 180",
          "concept": "multi-box-dependency recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 15,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-181-mixed-mastery-teach",
        "revision": 1,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#------.--#",
          "#-#-------#",
          "#----#--#-#",
          "#-#-------#",
          "#----##---#",
          "#-#--#-.--#",
          "#--#--.##-#",
          "#---------#",
          "###########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 7,
            "y": 3
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Grand Constellation 181",
          "concept": "introduce mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 20,
      "optimalPushes": 7
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-182-mixed-mastery-practice",
        "revision": 1,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#-----..--#",
          "#----#-#--#",
          "#--#------#",
          "#--#-#----#",
          "#----##---#",
          "#-------#-#",
          "#-#----##-#",
          "#----.----#",
          "###########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 1
          },
          {
            "x": 5,
            "y": 3
          },
          {
            "x": 2,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Grand Constellation 182",
          "concept": "practice mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 33,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-183-mixed-mastery-combine",
        "revision": 1,
        "width": 10,
        "height": 11,
        "terrain": [
          "##########",
          "#--------#",
          "#-#------#",
          "#----###-#",
          "#------.-#",
          "#-#.-#---#",
          "#-#-----.#",
          "#----#---#",
          "#-#-#----#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 6,
            "y": 6
          },
          {
            "x": 6,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Grand Constellation 183",
          "concept": "combine mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 25,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-184-mixed-mastery-test",
        "revision": 1,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#---------#",
          "#-----#.--#",
          "#-----#---#",
          "#-#-#-#---#",
          "#----#----#",
          "#-##----#.#",
          "#--#----#-#",
          "#--###--#.#",
          "#---------#",
          "###########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 8,
            "y": 2
          },
          {
            "x": 8,
            "y": 4
          },
          {
            "x": 5,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Grand Constellation 184",
          "concept": "test mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 30,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-185-mixed-mastery-recover",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#--##--#-#",
          "#-.------#",
          "#-#------#",
          "#------#-#",
          "#.--#--#-#",
          "#--#---#-#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 8
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 2,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Grand Constellation 185",
          "concept": "mixed-mastery recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 16,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-186-mixed-mastery-teach",
        "revision": 1,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#---------#",
          "#---##----#",
          "#------#--#",
          "#--#-.-#--#",
          "#--#--##.-#",
          "#--#-----.#",
          "#--#-#-#--#",
          "#-#---#---#",
          "#---------#",
          "###########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 6,
            "y": 6
          },
          {
            "x": 8,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Grand Constellation 186",
          "concept": "introduce mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 19,
      "optimalPushes": 6
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-187-mixed-mastery-practice",
        "revision": 1,
        "width": 10,
        "height": 11,
        "terrain": [
          "##########",
          "#--------#",
          "#----###-#",
          "#--#----.#",
          "#-#----#-#",
          "#.-----#-#",
          "#-#--##--#",
          "#.#----#-#",
          "#----#---#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 8,
            "y": 2
          },
          {
            "x": 4,
            "y": 4
          },
          {
            "x": 2,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Grand Constellation 187",
          "concept": "practice mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 39,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-188-mixed-mastery-combine",
        "revision": 1,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#---------#",
          "#--#--#---#",
          "#---#---#.#",
          "#--##----.#",
          "#--#-#----#",
          "#-#----#--#",
          "#-------#.#",
          "#---------#",
          "###########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 8,
            "y": 2
          },
          {
            "x": 7,
            "y": 3
          },
          {
            "x": 5,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Grand Constellation 188",
          "concept": "combine mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 42,
      "optimalPushes": 14
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-190-mixed-mastery-recover",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#--#-#---#",
          "#--#---#-#",
          "#--#--.--#",
          "#--#---#-#",
          "#--------#",
          "#-#---#--#",
          "#--.-----#",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 5
          },
          {
            "x": 4,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Grand Constellation 190",
          "concept": "mixed-mastery recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 8,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-191-mixed-mastery-teach",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#-.------#",
          "#-#--#-#-#",
          "#--#.--#-#",
          "#-#--.#--#",
          "#-#--#---#",
          "#--------#",
          "#-#--#---#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 1
          },
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 5,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Grand Constellation 191",
          "concept": "introduce mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 29,
      "optimalPushes": 5
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-192-mixed-mastery-practice",
        "revision": 1,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#-----.---#",
          "#-----.##-#",
          "#---#-----#",
          "#-#-------#",
          "#-#-##-##-#",
          "#---#-----#",
          "#----#----#",
          "#---#--#--#",
          "#-----.---#",
          "###########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 8,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Grand Constellation 192",
          "concept": "practice mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 26,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-193-mixed-mastery-combine",
        "revision": 1,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#--.------#",
          "#---------#",
          "#---#-##--#",
          "#-#-..----#",
          "#------##-#",
          "#-###--#--#",
          "#-#--#--#-#",
          "#---------#",
          "###########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 6,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Grand Constellation 193",
          "concept": "combine mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 45,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-194-mixed-mastery-test",
        "revision": 1,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#---------#",
          "#--###--#-#",
          "#-#--#----#",
          "#--#-#----#",
          "#--.---#--#",
          "#.--#---#-#",
          "#.#-------#",
          "#---#-#-#-#",
          "#---------#",
          "###########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 6
          },
          {
            "x": 6,
            "y": 7
          },
          {
            "x": 2,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Grand Constellation 194",
          "concept": "test mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 36,
      "optimalPushes": 14
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-195-mixed-mastery-recover",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#----#---#",
          "#---#----#",
          "#--#-----#",
          "#------#-#",
          "#-##-#---#",
          "#-#---#--#",
          "#-.---.--#",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 8
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 7
          },
          {
            "x": 3,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Grand Constellation 195",
          "concept": "mixed-mastery recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 13,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-197-mixed-mastery-practice",
        "revision": 1,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#----.----#",
          "#---#-----#",
          "#---#-#---#",
          "#--##--#--#",
          "#-#----#--#",
          "#.#--#--#-#",
          "#.#-------#",
          "#---------#",
          "###########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 1,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Grand Constellation 197",
          "concept": "practice mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 38,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-198-mixed-mastery-combine",
        "revision": 1,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#-.-----.-#",
          "#.--#---#-#",
          "#---#-----#",
          "#---#-----#",
          "#---#--##-#",
          "#-----#---#",
          "#---###-#-#",
          "#---#-#---#",
          "#---------#",
          "###########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 3,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Grand Constellation 198",
          "concept": "combine mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 30,
      "optimalPushes": 11
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-200-mixed-mastery-recover",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#----.---#",
          "#-#---##-#",
          "#--#-#---#",
          "#-----#--#",
          "#--------#",
          "#--#-##--#",
          "#-----.--#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 1
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Grand Constellation 200",
          "concept": "mixed-mastery recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 14,
      "optimalPushes": 3
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-43-sequencing-combine",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#-----.--#",
          "#-#-###--#",
          "#--##----#",
          "#.-#-##--#",
          "#.-------#",
          "#-###----#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 7,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 043",
          "concept": "combine sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 69,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-74-staging-order-test",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#-#-#-##-#",
          "#----##--#",
          "#.#------#",
          "#--#--#--#",
          "#-##-#---#",
          "#-.---.--#",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 7,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Starlight Stage 074",
          "concept": "test staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 82,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-196-mixed-mastery-teach",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#--##--#-#",
          "#---.--#-#",
          "#--##----#",
          "#-#--#-#-#",
          "#-#--#--.#",
          "#--#-##-.#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 7,
            "y": 6
          },
          {
            "x": 7,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Grand Constellation 196",
          "concept": "introduce mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 70,
      "optimalPushes": 7
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-46-sequencing-teach",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#-##--##-#",
          "#----.#--#",
          "#---#-##-#",
          "#-------.#",
          "#--###-#.#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 4
          },
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 6,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 046",
          "concept": "introduce sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 57,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-107-congestion-practice",
        "revision": 2,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#--.----#",
          "#--##---#",
          "#-#.--#-#",
          "#-##----#",
          "#----#--#",
          "#--#.##-#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 3,
            "y": 5
          },
          {
            "x": 2,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Cloud Junction 107",
          "concept": "practice congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 60,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-129-counterintuitive-routing-test",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#.-------#",
          "#---#----#",
          "#-#--#-#-#",
          "#--#---#-#",
          "#--#-#-#-#",
          "#---#--.-#",
          "#-###--#-#",
          "#-.------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 8
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 4,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Far Orbit 129",
          "concept": "test counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 74,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-187-mixed-mastery-practice",
        "revision": 2,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#--##---#",
          "#-#--##.#",
          "#-----#-#",
          "#-###---#",
          "#-----#-#",
          "#-.-.---#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 6,
            "y": 5
          },
          {
            "x": 3,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Grand Constellation 187",
          "concept": "practice mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 68,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-31-sequencing-teach",
        "revision": 2,
        "width": 8,
        "height": 8,
        "terrain": [
          "########",
          "#------#",
          "#.-#.#-#",
          "#.-----#",
          "#--#---#",
          "#-#-##-#",
          "#------#",
          "########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 5,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Star Sequence 031",
          "concept": "introduce sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 35,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-32-sequencing-practice",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#-------.#",
          "#-#--#---#",
          "#-#####--#",
          "#--###--.#",
          "#--#---#.#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 7,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Star Sequence 032",
          "concept": "practice sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 47,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-33-sequencing-combine",
        "revision": 2,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#------#",
          "#------#",
          "#--#-#-#",
          "#-###-.#",
          "#--##-.#",
          "#--#-#.#",
          "#------#",
          "########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 6,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Star Sequence 033",
          "concept": "combine sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 35,
      "optimalPushes": 14
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-34-sequencing-test",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--.-----#",
          "#-#------#",
          "#--##-..-#",
          "#-#-##-#-#",
          "#-----#--#",
          "#-----#--#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 6,
            "y": 2
          }
        ],
        "metadata": {
          "title": "Star Sequence 034",
          "concept": "test sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 36,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-35-sequencing-recover",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#.-.#--#-#",
          "#---#-#--#",
          "#-#-#--#-#",
          "#-#--#---#",
          "#--#--##-#",
          "#------.-#",
          "##########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 4,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Star Sequence 035",
          "concept": "sequencing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 32,
      "optimalPushes": 6
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-36-sequencing-teach",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#-----.--#",
          "#-#--##--#",
          "#-#------#",
          "#---#-#--#",
          "#-..--#--#",
          "#--#####-#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 3,
            "y": 3
          },
          {
            "x": 2,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Star Sequence 036",
          "concept": "introduce sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 40,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-37-sequencing-practice",
        "revision": 2,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#------#",
          "#-#--#.#",
          "#------#",
          "#-#---.#",
          "#-#-##-#",
          "#-#.---#",
          "#------#",
          "########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 4,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Star Sequence 037",
          "concept": "practice sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 23,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-38-sequencing-combine",
        "revision": 2,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#.-----#",
          "#----#-#",
          "#--###-#",
          "#--#---#",
          "#----#-#",
          "#--#.--#",
          "#--.---#",
          "########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 3,
            "y": 5
          },
          {
            "x": 5,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 038",
          "concept": "combine sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 29,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-39-sequencing-test",
        "revision": 2,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#----.-#",
          "#----#-#",
          "#-##---#",
          "#------#",
          "#-#.---#",
          "#-#-##-#",
          "#--.---#",
          "########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 4,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Star Sequence 039",
          "concept": "test sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 25,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-40-sequencing-recover",
        "revision": 2,
        "width": 9,
        "height": 8,
        "terrain": [
          "#########",
          "#---.---#",
          "#-###-#-#",
          "#-#-#--.#",
          "#---.#--#",
          "#-##----#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 5,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Star Sequence 040",
          "concept": "sequencing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 24,
      "optimalPushes": 6
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-41-sequencing-teach",
        "revision": 2,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#-##-##-#",
          "#--#-#-.#",
          "#.#-##--#",
          "#-------#",
          "#-#-#--.#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 6,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 041",
          "concept": "introduce sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 63,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-42-sequencing-practice",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#-###----#",
          "#----#--.#",
          "#----##--#",
          "#-#------#",
          "#-.---##-#",
          "#-----.--#",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 5,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Star Sequence 042",
          "concept": "practice sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 32,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-43-sequencing-combine",
        "revision": 3,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#-#------#",
          "#---##---#",
          "#-#------#",
          "#---##.--#",
          "#.-###.--#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 4
          },
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 2,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 043",
          "concept": "combine sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 45,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-44-sequencing-test",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#-.------#",
          "#---#-#--#",
          "#-##-#---#",
          "#.-#-----#",
          "#.-#---#-#",
          "#---#----#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 2,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 044",
          "concept": "test sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 60,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-45-sequencing-recover",
        "revision": 2,
        "width": 9,
        "height": 8,
        "terrain": [
          "#########",
          "#-------#",
          "#-#-----#",
          "#--#--#-#",
          "#-.-----#",
          "#-###-#-#",
          "#----..-#",
          "#########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 4,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 045",
          "concept": "sequencing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 36,
      "optimalPushes": 6
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-46-sequencing-teach",
        "revision": 3,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#----.--#",
          "#-#-#---#",
          "#---#---#",
          "#-#--##-#",
          "#-#-##-.#",
          "#-----#.#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 7,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Star Sequence 046",
          "concept": "introduce sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 14,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-47-sequencing-practice",
        "revision": 2,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#------#",
          "#---##-#",
          "#----#-#",
          "#-#-.#-#",
          "#----.-#",
          "#--#-#-#",
          "#-----.#",
          "########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 2,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 047",
          "concept": "practice sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 33,
      "optimalPushes": 14
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-48-sequencing-combine",
        "revision": 2,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#-#-#-#-#",
          "#--##-#-#",
          "#-#-----#",
          "#-.#-#-.#",
          "#-.---#-#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 4,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 048",
          "concept": "combine sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 44,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-49-sequencing-test",
        "revision": 2,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#---------#",
          "#-----#---#",
          "#--##---#-#",
          "#-#---#---#",
          "#---.#--#-#",
          "#-----#-#-#",
          "#-###-----#",
          "#--.-.----#",
          "###########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 5
          },
          {
            "x": 7,
            "y": 6
          },
          {
            "x": 7,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Star Sequence 049",
          "concept": "test sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 39,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-50-sequencing-recover",
        "revision": 2,
        "width": 9,
        "height": 8,
        "terrain": [
          "#########",
          "#-.-----#",
          "#-#-##--#",
          "#--.##--#",
          "#-------#",
          "#--#--#-#",
          "#---.---#",
          "#########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 3,
            "y": 4
          },
          {
            "x": 4,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Star Sequence 050",
          "concept": "sequencing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 34,
      "optimalPushes": 6
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-51-sequencing-teach",
        "revision": 2,
        "width": 8,
        "height": 8,
        "terrain": [
          "########",
          "#------#",
          "#----#-#",
          "#--#---#",
          "#.#.##-#",
          "#.---#-#",
          "#------#",
          "########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 1,
            "y": 2
          },
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 2,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Star Sequence 051",
          "concept": "introduce sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 32,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-52-sequencing-practice",
        "revision": 2,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#---##-.#",
          "#--##---#",
          "#-------#",
          "#----.#-#",
          "#.#####-#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 5,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Star Sequence 052",
          "concept": "practice sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 33,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-53-sequencing-combine",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#---.----#",
          "#--#-----#",
          "#-##.-##-#",
          "#-#--#---#",
          "#-#####-.#",
          "#--------#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 3,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 053",
          "concept": "combine sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 58,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-54-sequencing-test",
        "revision": 2,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#.-----.--#",
          "#-#-----.-#",
          "#------##-#",
          "#-##--#---#",
          "#---#-##--#",
          "#-#-----#-#",
          "#-#---#---#",
          "#---------#",
          "###########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 3,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Star Sequence 054",
          "concept": "test sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 30,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-55-sequencing-recover",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#------#-#",
          "#---#--#-#",
          "#-----##-#",
          "#-#.#-#--#",
          "#.---#---#",
          "#.-------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 1,
            "y": 4
          },
          {
            "x": 3,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 055",
          "concept": "sequencing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 18,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-56-sequencing-teach",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#-.----.-#",
          "#-#---#.-#",
          "#--##-#--#",
          "#-#-#----#",
          "#-----#--#",
          "#-----#--#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 7,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Star Sequence 056",
          "concept": "introduce sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 39,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-57-sequencing-practice",
        "revision": 2,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#------#",
          "#-#-##-#",
          "#.#--#-#",
          "#----.-#",
          "#---##-#",
          "#-#--#-#",
          "#.-----#",
          "########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 3
          },
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 3,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Star Sequence 057",
          "concept": "practice sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 34,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-58-sequencing-combine",
        "revision": 2,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#------#",
          "#----#-#",
          "#--#-#-#",
          "#--#-#.#",
          "#--.##-#",
          "#--##--#",
          "#--.---#",
          "########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 6,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Star Sequence 058",
          "concept": "combine sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 47,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-59-sequencing-test",
        "revision": 2,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#---------#",
          "#-##--#-#-#",
          "#-###---#-#",
          "#-----##--#",
          "#-.#---#--#",
          "#-.--#--.-#",
          "#---------#",
          "#---------#",
          "###########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 6
          },
          {
            "x": 7,
            "y": 6
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Star Sequence 059",
          "concept": "test sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 22,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-60-sequencing-recover",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--.-----#",
          "#--#-#--.#",
          "#------#-#",
          "#-#------#",
          "#-##---#-#",
          "#---##.--#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 5,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Star Sequence 060",
          "concept": "sequencing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 18,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-61-staging-order-teach",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#-----#--#",
          "#---#-#--#",
          "#.#--#---#",
          "#-#---#--#",
          "#-----##-#",
          "#-.--.---#",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 4,
            "y": 6
          },
          {
            "x": 5,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Starlight Stage 061",
          "concept": "introduce staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 22,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-62-staging-order-practice",
        "revision": 2,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#-------.-#",
          "#-.-------#",
          "#-.##-#-#-#",
          "#-#-#-----#",
          "#-------#-#",
          "#-#-#--##-#",
          "#---#-#---#",
          "#---------#",
          "###########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 7,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Starlight Stage 062",
          "concept": "practice staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 23,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-63-staging-order-combine",
        "revision": 2,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#------#",
          "#-###--#",
          "#------#",
          "#----.-#",
          "#--###-#",
          "#---#--#",
          "#-..---#",
          "########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 4,
            "y": 4
          },
          {
            "x": 2,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Starlight Stage 063",
          "concept": "combine staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 31,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-64-staging-order-test",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#------#.#",
          "#-----#--#",
          "#-#----#-#",
          "#-##-#---#",
          "#----##--#",
          "#----#-#-#",
          "#-----..-#",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 6
          },
          {
            "x": 3,
            "y": 7
          },
          {
            "x": 8,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 064",
          "concept": "test staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 48,
      "optimalPushes": 16
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-65-staging-order-recover",
        "revision": 2,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#------#",
          "#-#--#-#",
          "#-##-#-#",
          "#---##-#",
          "#.---#-#",
          "#---#--#",
          "#---..-#",
          "########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 2,
            "y": 6
          },
          {
            "x": 3,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 065",
          "concept": "staging-order recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 31,
      "optimalPushes": 6
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-66-staging-order-teach",
        "revision": 2,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#.-----#",
          "#-##---#",
          "#-##---#",
          "#---#--#",
          "#----.-#",
          "#-##---#",
          "#--.---#",
          "########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 5,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Starlight Stage 066",
          "concept": "introduce staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 33,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-67-staging-order-practice",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#------.-#",
          "#-##-##--#",
          "#--..----#",
          "#-##-----#",
          "#--#---#-#",
          "#--##-##-#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 5,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Starlight Stage 067",
          "concept": "practice staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 30,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-68-staging-order-combine",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#-----..-#",
          "#--###---#",
          "#-----#--#",
          "#--#--#.-#",
          "#-#-#----#",
          "#---#----#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 3
          },
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 6,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Starlight Stage 068",
          "concept": "combine staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 27,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-69-staging-order-test",
        "revision": 2,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#--.----#",
          "#-##----#",
          "#-##--#-#",
          "#--.-#--#",
          "#-#.--#-#",
          "#-#-#---#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 4,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Starlight Stage 069",
          "concept": "test staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 38,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-70-staging-order-recover",
        "revision": 2,
        "width": 9,
        "height": 8,
        "terrain": [
          "#########",
          "#-------#",
          "#---###-#",
          "#-#-#---#",
          "#------.#",
          "#--.-##.#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 3
          },
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 6,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Starlight Stage 070",
          "concept": "staging-order recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 31,
      "optimalPushes": 6
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-71-staging-order-teach",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#.-------#",
          "#-#----#-#",
          "#-#--#---#",
          "#-------.#",
          "#-###--#-#",
          "#-----#--#",
          "#--.-----#",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 5,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Starlight Stage 071",
          "concept": "introduce staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 45,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-72-staging-order-practice",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#-----.--#",
          "#-#--###-#",
          "#--------#",
          "#----#-#-#",
          "#-#-##---#",
          "#--#-#-#-#",
          "#--..----#",
          "##########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 1
          },
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 7,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 072",
          "concept": "practice staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 33,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-73-staging-order-combine",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#----##--#",
          "#----.##-#",
          "#--##----#",
          "#--.-##--#",
          "#---.--#-#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 2,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Starlight Stage 073",
          "concept": "combine staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 22,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-74-staging-order-test",
        "revision": 3,
        "width": 8,
        "height": 8,
        "terrain": [
          "########",
          "#-.----#",
          "#------#",
          "#-##-#-#",
          "#----#.#",
          "#.#--#-#",
          "#------#",
          "########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 3,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Starlight Stage 074",
          "concept": "test staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 40,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-75-staging-order-recover",
        "revision": 2,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#.-----#",
          "#-##-#-#",
          "#-##--.#",
          "#.--#--#",
          "#------#",
          "#-##-#-#",
          "#------#",
          "########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 4,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Starlight Stage 075",
          "concept": "staging-order recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 34,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-76-staging-order-teach",
        "revision": 2,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#------#",
          "#-#-##-#",
          "#.#.#--#",
          "#-#-##-#",
          "#---#--#",
          "#------#",
          "#-.----#",
          "########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 3,
            "y": 6
          },
          {
            "x": 5,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Starlight Stage 076",
          "concept": "introduce staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 19,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-77-staging-order-practice",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#------.-#",
          "#-#--##--#",
          "#-.#--##-#",
          "#------#-#",
          "#--#--#--#",
          "#-#--#-#-#",
          "#----.---#",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 1
          },
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 4,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Starlight Stage 077",
          "concept": "practice staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 33,
      "optimalPushes": 14
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-78-staging-order-combine",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#----#-#-#",
          "#-.-##---#",
          "#---#----#",
          "#-##--#.-#",
          "#.-#-###-#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 3,
            "y": 3
          },
          {
            "x": 7,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Starlight Stage 078",
          "concept": "combine staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 53,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-79-staging-order-test",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#-##--#-.#",
          "#--#-----#",
          "#--#-#---#",
          "#---#--#-#",
          "#-----#--#",
          "#-##---.-#",
          "#---.----#",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 3,
            "y": 6
          },
          {
            "x": 5,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Starlight Stage 079",
          "concept": "test staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 46,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-80-staging-order-recover",
        "revision": 2,
        "width": 9,
        "height": 8,
        "terrain": [
          "#########",
          "#.---.--#",
          "#--#--#-#",
          "#--#--#-#",
          "#---#---#",
          "#.#---#-#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 6,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Starlight Stage 080",
          "concept": "staging-order recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 44,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-81-staging-order-teach",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#------.-#",
          "#--#--##-#",
          "#-----##-#",
          "#-#------#",
          "#------#-#",
          "#-#-#.---#",
          "#-----.--#",
          "##########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 2,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Starlight Stage 081",
          "concept": "introduce staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 29,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-82-staging-order-practice",
        "revision": 2,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#---------#",
          "#-#---#-#-#",
          "#------#--#",
          "#-###-.---#",
          "#-#---.---#",
          "#--#---#--#",
          "#-#----##-#",
          "#----.----#",
          "###########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 3
          },
          {
            "x": 8,
            "y": 5
          },
          {
            "x": 6,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 082",
          "concept": "practice staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 40,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-83-staging-order-combine",
        "revision": 2,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#--#----#",
          "#--##-#-#",
          "#-##-..-#",
          "#--#--#-#",
          "#-#---#-#",
          "#------.#",
          "#########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 4,
            "y": 6
          },
          {
            "x": 2,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 083",
          "concept": "combine staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 29,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-84-staging-order-test",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#-----#--#",
          "#-#------#",
          "#--###---#",
          "#--##-#--#",
          "#---#..--#",
          "#---.----#",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 3
          },
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 2,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 084",
          "concept": "test staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 47,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-85-staging-order-recover",
        "revision": 2,
        "width": 8,
        "height": 8,
        "terrain": [
          "########",
          "#------#",
          "#-#--.-#",
          "#----#-#",
          "#----#.#",
          "#-###--#",
          "#-----.#",
          "########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 3
          },
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 4,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Starlight Stage 085",
          "concept": "staging-order recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 35,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-86-staging-order-teach",
        "revision": 2,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#---------#",
          "#--###----#",
          "#-----#---#",
          "#---###-#-#",
          "#---###.--#",
          "#---#-----#",
          "#.--#-----#",
          "#----.----#",
          "###########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 2,
            "y": 6
          },
          {
            "x": 7,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 086",
          "concept": "introduce staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 34,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-87-staging-order-practice",
        "revision": 2,
        "width": 8,
        "height": 8,
        "terrain": [
          "########",
          "#------#",
          "#-#--#-#",
          "#--#---#",
          "#-##---#",
          "#-#----#",
          "#-.-..-#",
          "########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 4
          },
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 5,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Starlight Stage 087",
          "concept": "practice staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 24,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-88-staging-order-combine",
        "revision": 2,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#------..-#",
          "#--#----#-#",
          "#---#--#--#",
          "#---###---#",
          "#-###-##--#",
          "#-----#---#",
          "#------.--#",
          "#---------#",
          "###########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 8,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Starlight Stage 088",
          "concept": "combine staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 46,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-89-staging-order-test",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#--------#",
          "#------#-#",
          "#---##-#-#",
          "#-#----#-#",
          "#-..-#-#-#",
          "#-#---##-#",
          "#-----.--#",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 3
          },
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 4,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 089",
          "concept": "test staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 35,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-90-staging-order-recover",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#---.----#",
          "#-##--#--#",
          "#-##--##-#",
          "#--------#",
          "#--.##-#-#",
          "#--##--#-#",
          "#.-------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 1,
            "y": 3
          },
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 2,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Starlight Stage 090",
          "concept": "staging-order recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 27,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-91-congestion-teach",
        "revision": 2,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#---------#",
          "#--#--##--#",
          "#-##------#",
          "#-##------#",
          "#----#--#-#",
          "#---##---.#",
          "#--#-#---.#",
          "#-------.-#",
          "###########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 8,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Cloud Junction 091",
          "concept": "introduce congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 24,
      "optimalPushes": 14
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-92-congestion-practice",
        "revision": 2,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#---------#",
          "#---##-##-#",
          "#-#-####--#",
          "#-#-------#",
          "#-------#.#",
          "#--#-#----#",
          "#-----.---#",
          "#-------.-#",
          "###########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 5
          },
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Cloud Junction 092",
          "concept": "practice congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 24,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-93-congestion-combine",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#.-------#",
          "#----##--#",
          "#-#---#--#",
          "#--#----.#",
          "#-##--##-#",
          "#---###-.#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 2,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Cloud Junction 093",
          "concept": "combine congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 47,
      "optimalPushes": 14
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-94-congestion-test",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#--#-#-#-#",
          "#----##--#",
          "#-#-###--#",
          "#----#.--#",
          "#--##--#-#",
          "#.-------#",
          "#-------.#",
          "##########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 7,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Cloud Junction 094",
          "concept": "test congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 34,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-95-congestion-recover",
        "revision": 2,
        "width": 9,
        "height": 8,
        "terrain": [
          "#########",
          "#-------#",
          "#----#--#",
          "#-#.----#",
          "#----##.#",
          "#-#.#-#-#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 3,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Cloud Junction 095",
          "concept": "congestion recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 24,
      "optimalPushes": 6
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-96-congestion-teach",
        "revision": 2,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#------#",
          "#-##---#",
          "#---.--#",
          "#-####-#",
          "#---#--#",
          "#-#--#-#",
          "#.---.-#",
          "########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 5,
            "y": 3
          },
          {
            "x": 3,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Cloud Junction 096",
          "concept": "introduce congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 50,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-97-congestion-practice",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#-#-#-.#-#",
          "#-#--#---#",
          "#-----.--#",
          "#-###--#-#",
          "#----###-#",
          "#.-------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 7,
            "y": 3
          },
          {
            "x": 2,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Cloud Junction 097",
          "concept": "practice congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 39,
      "optimalPushes": 6
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-98-congestion-combine",
        "revision": 2,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#------#",
          "#-####-#",
          "#-#----#",
          "#--#---#",
          "#---#--#",
          "#--.##-#",
          "#---..-#",
          "########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 2,
            "y": 6
          },
          {
            "x": 2,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Cloud Junction 098",
          "concept": "combine congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 18,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-99-congestion-test",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#---.-.--#",
          "#-#--#-#-#",
          "#-#--#---#",
          "#---#----#",
          "#--##----#",
          "#--#-.#--#",
          "#-##-#---#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 8
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 7,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Cloud Junction 099",
          "concept": "test congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 33,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-100-congestion-recover",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#--#-##--#",
          "#----#-#-#",
          "#--#-#---#",
          "#.---##--#",
          "#-.-#-##-#",
          "#---.----#",
          "##########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 3,
            "y": 6
          },
          {
            "x": 2,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Cloud Junction 100",
          "concept": "congestion recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 25,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-101-congestion-teach",
        "revision": 2,
        "width": 9,
        "height": 8,
        "terrain": [
          "#########",
          "#------.#",
          "#---##--#",
          "#-#-----#",
          "#.-###--#",
          "#----#--#",
          "#--.----#",
          "#########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 1,
            "y": 3
          },
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 6,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Cloud Junction 101",
          "concept": "introduce congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 36,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-102-congestion-practice",
        "revision": 2,
        "width": 9,
        "height": 8,
        "terrain": [
          "#########",
          "#-------#",
          "#--##---#",
          "#-#---#-#",
          "#-#.-#--#",
          "#-#---.-#",
          "#-.-----#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 4
          },
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 5,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Cloud Junction 102",
          "concept": "practice congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 28,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-103-congestion-combine",
        "revision": 2,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#------#",
          "#.####-#",
          "#-#.---#",
          "#--##--#",
          "#------#",
          "#---##-#",
          "#-.----#",
          "########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 5,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Cloud Junction 103",
          "concept": "combine congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 30,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-104-congestion-test",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#--.-----#",
          "#--#-#-#-#",
          "#-.#-----#",
          "#----##-.#",
          "#-#--###-#",
          "#-#--##--#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 4,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Cloud Junction 104",
          "concept": "test congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 33,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-105-congestion-recover",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#-.------#",
          "#-#.-----#",
          "#-#------#",
          "#-##-----#",
          "#-##-#.--#",
          "#-----##-#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 6,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Cloud Junction 105",
          "concept": "congestion recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 18,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-106-congestion-teach",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#-#------#",
          "#--###---#",
          "#-####---#",
          "#-#-#-.#-#",
          "#----#---#",
          "#--.---.-#",
          "##########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 2,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Cloud Junction 106",
          "concept": "introduce congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 39,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-107-congestion-practice",
        "revision": 3,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#--#--#--#",
          "#---..##-#",
          "#-----#--#",
          "#.#-##---#",
          "#-----#--#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 4,
            "y": 4
          },
          {
            "x": 3,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Cloud Junction 107",
          "concept": "practice congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 30,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-108-congestion-combine",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#--------#",
          "#---####-#",
          "#-#------#",
          "#--#---#.#",
          "#---#--#.#",
          "#------.-#",
          "##########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 5,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Cloud Junction 108",
          "concept": "combine congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 55,
      "optimalPushes": 14
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-109-congestion-test",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#-------.#",
          "#---###-.#",
          "#-##-#.--#",
          "#----#-#-#",
          "#-#--#-#-#",
          "#---#--#-#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 7,
            "y": 2
          }
        ],
        "metadata": {
          "title": "Cloud Junction 109",
          "concept": "test congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 38,
      "optimalPushes": 13
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-110-congestion-recover",
        "revision": 2,
        "width": 9,
        "height": 8,
        "terrain": [
          "#########",
          "#-------#",
          "#-#-##--#",
          "#-#--#--#",
          "#--.----#",
          "#-##.---#",
          "#-----.-#",
          "#########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 5,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Cloud Junction 110",
          "concept": "congestion recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 15,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-111-congestion-teach",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#---.-.--#",
          "#----.-#-#",
          "#--------#",
          "#-#--##--#",
          "#-##-#---#",
          "#----##--#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 3,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Cloud Junction 111",
          "concept": "introduce congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 26,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-112-congestion-practice",
        "revision": 2,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#------#",
          "#---##-#",
          "#-#-#--#",
          "#---#--#",
          "#--#--.#",
          "#----#.#",
          "#-.----#",
          "########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 3,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Cloud Junction 112",
          "concept": "practice congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 42,
      "optimalPushes": 6
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-113-congestion-combine",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#------.-#",
          "#----##--#",
          "#-#---##-#",
          "#-##-#---#",
          "#-#----#-#",
          "#--##----#",
          "#----..--#",
          "##########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 6,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Cloud Junction 113",
          "concept": "combine congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 57,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-114-congestion-test",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#-----#--#",
          "#-#--###-#",
          "#-##-----#",
          "#-#--#---#",
          "#--..#-#-#",
          "#-#---.--#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 6,
            "y": 6
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Cloud Junction 114",
          "concept": "test congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 41,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-115-congestion-recover",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#------#-#",
          "#-----.#-#",
          "#-#-#.---#",
          "#-#--###-#",
          "#.###-#--#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 1,
            "y": 3
          },
          {
            "x": 5,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Cloud Junction 115",
          "concept": "congestion recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 35,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-116-congestion-teach",
        "revision": 2,
        "width": 8,
        "height": 8,
        "terrain": [
          "########",
          "#---.--#",
          "#-#.---#",
          "#----#-#",
          "#----#.#",
          "#--###-#",
          "#------#",
          "########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 3,
            "y": 3
          },
          {
            "x": 2,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Cloud Junction 116",
          "concept": "introduce congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 24,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-117-congestion-practice",
        "revision": 2,
        "width": 9,
        "height": 8,
        "terrain": [
          "#########",
          "#-------#",
          "#--.##--#",
          "#-.-#---#",
          "#---##--#",
          "#-#--#--#",
          "#------.#",
          "#########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 3,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Cloud Junction 117",
          "concept": "practice congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 26,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-118-congestion-combine",
        "revision": 2,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#-##-#-.#",
          "#--##---#",
          "#---#---#",
          "#-#---#-#",
          "#-#--#--#",
          "#.-.----#",
          "#########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 4,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Cloud Junction 118",
          "concept": "combine congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 42,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-119-congestion-test",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#-----..-#",
          "#---###--#",
          "#----#---#",
          "#----#-#.#",
          "#-----#--#",
          "#-----#--#",
          "#---####-#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 3,
            "y": 6
          },
          {
            "x": 8,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Cloud Junction 119",
          "concept": "test congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 67,
      "optimalPushes": 21
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-120-congestion-recover",
        "revision": 2,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#------#",
          "#--###-#",
          "#-#-.--#",
          "#------#",
          "#--#---#",
          "#-#--#-#",
          "#----..#",
          "########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 4,
            "y": 4
          },
          {
            "x": 4,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Cloud Junction 120",
          "concept": "congestion recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 27,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-121-counterintuitive-routing-teach",
        "revision": 2,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#-.----#",
          "#--##--#",
          "#--.---#",
          "#---#-.#",
          "#---#--#",
          "#-##-#-#",
          "#------#",
          "########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 1
          },
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 5,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Far Orbit 121",
          "concept": "introduce counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 45,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-122-counterintuitive-routing-practice",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#-#--#---#",
          "#-----#--#",
          "#-#-#.---#",
          "#-##-##-.#",
          "#--#-##--#",
          "#---.----#",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 7,
            "y": 6
          },
          {
            "x": 3,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Far Orbit 122",
          "concept": "practice counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 37,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-123-counterintuitive-routing-combine",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#-######-#",
          "#--#--##-#",
          "#--##----#",
          "#--#-#---#",
          "#------..#",
          "#----.---#",
          "##########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 3,
            "y": 6
          },
          {
            "x": 6,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Far Orbit 123",
          "concept": "combine counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 17,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-124-counterintuitive-routing-test",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#.-------#",
          "#-##-#-#-#",
          "#---##---#",
          "#-----##-#",
          "#---.-##-#",
          "#-##-#---#",
          "#-------.#",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 1
          },
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 7,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Far Orbit 124",
          "concept": "test counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 57,
      "optimalPushes": 14
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-125-counterintuitive-routing-recover",
        "revision": 2,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#----#--#",
          "#--####-#",
          "#---##--#",
          "#----##-#",
          "#.---#--#",
          "#.---.--#",
          "#########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 2,
            "y": 6
          },
          {
            "x": 3,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Far Orbit 125",
          "concept": "counterintuitive-routing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 18,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-126-counterintuitive-routing-teach",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#--------#",
          "#-##---#-#",
          "#--.--##-#",
          "#.##--##-#",
          "#--------#",
          "#.-------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 4,
            "y": 4
          },
          {
            "x": 7,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Far Orbit 126",
          "concept": "introduce counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 35,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-127-counterintuitive-routing-practice",
        "revision": 2,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#---------#",
          "#--#-#--..#",
          "#---#---#-#",
          "#-#-------#",
          "#-###---#-#",
          "#--#-.#---#",
          "#----#-#--#",
          "#---------#",
          "###########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 8,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Far Orbit 127",
          "concept": "practice counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 24,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-128-counterintuitive-routing-combine",
        "revision": 2,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#--.---#",
          "#--##--#",
          "#--#---#",
          "#-###-.#",
          "#-##.--#",
          "#----#-#",
          "#------#",
          "########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 5,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Far Orbit 128",
          "concept": "combine counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 48,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-129-counterintuitive-routing-test",
        "revision": 2,
        "width": 9,
        "height": 8,
        "terrain": [
          "#########",
          "#----.--#",
          "#---#---#",
          "#-#-###-#",
          "#-#.----#",
          "#-#-#-#-#",
          "#----.--#",
          "#########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 4,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Far Orbit 129",
          "concept": "test counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 53,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-130-counterintuitive-routing-recover",
        "revision": 2,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#------#",
          "#--##--#",
          "#-##--.#",
          "#--#---#",
          "#----#-#",
          "#.--#--#",
          "#--.---#",
          "########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 1,
            "y": 2
          },
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 2,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Far Orbit 130",
          "concept": "counterintuitive-routing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 31,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-131-counterintuitive-routing-teach",
        "revision": 1,
        "width": 9,
        "height": 10,
        "terrain": [
          "#########",
          "#-------#",
          "#-#-#-#.#",
          "#-#-----#",
          "#--#----#",
          "#-------#",
          "#-#-##--#",
          "#--#-#--#",
          "#-.----.#",
          "#########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 6,
            "y": 6
          },
          {
            "x": 7,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Far Orbit 131",
          "concept": "introduce counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 50,
      "optimalPushes": 11
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-132-counterintuitive-routing-practice",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#-.------#",
          "#--##-#--#",
          "#---#-#--#",
          "#-##.-#--#",
          "#-##-###-#",
          "#--------#",
          "#-.------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 7,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Far Orbit 132",
          "concept": "practice counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 38,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-133-counterintuitive-routing-combine",
        "revision": 2,
        "width": 9,
        "height": 8,
        "terrain": [
          "#########",
          "#-------#",
          "#.---#--#",
          "#.-#-##-#",
          "#--.-#--#",
          "#-#---#-#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 4,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Far Orbit 133",
          "concept": "combine counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 35,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-134-counterintuitive-routing-test",
        "revision": 1,
        "width": 9,
        "height": 10,
        "terrain": [
          "#########",
          "#-------#",
          "#------.#",
          "#-##-#-.#",
          "#-##-#--#",
          "#-##----#",
          "#----#-.#",
          "#-#####-#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 6,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Far Orbit 134",
          "concept": "test counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 56,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-135-counterintuitive-routing-recover",
        "revision": 2,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#---------#",
          "#-----##--#",
          "#--.--.---#",
          "#-#--#-#-.#",
          "#--##--##-#",
          "#---##----#",
          "#---#---#-#",
          "#---------#",
          "###########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 6,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Far Orbit 135",
          "concept": "counterintuitive-routing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 39,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-136-counterintuitive-routing-teach",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#----#---#",
          "#-#-##---#",
          "#-#-#-#-.#",
          "#--#-----#",
          "#--.#-#--#",
          "#-----.--#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 5,
            "y": 6
          },
          {
            "x": 4,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Far Orbit 136",
          "concept": "introduce counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 36,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-137-counterintuitive-routing-practice",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#-.------#",
          "#--------#",
          "#---#-##-#",
          "#-#----#-#",
          "#----#.#-#",
          "#---##---#",
          "#-----.--#",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 6,
            "y": 6
          },
          {
            "x": 7,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Far Orbit 137",
          "concept": "practice counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 49,
      "optimalPushes": 6
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-138-counterintuitive-routing-combine",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#---.---#",
          "#----#--#",
          "#-#-.-#-#",
          "#--####-#",
          "#-#-----#",
          "#-#-#-#-#",
          "#---.---#",
          "#########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 3,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Far Orbit 138",
          "concept": "combine counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 50,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-139-counterintuitive-routing-test",
        "revision": 1,
        "width": 9,
        "height": 10,
        "terrain": [
          "#########",
          "#-------#",
          "#-#####-#",
          "#------.#",
          "#--####-#",
          "#---.-#-#",
          "#-##--#-#",
          "#-#-.---#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 8
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 5,
            "y": 7
          },
          {
            "x": 6,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Far Orbit 139",
          "concept": "test counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 51,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-140-counterintuitive-routing-recover",
        "revision": 2,
        "width": 8,
        "height": 8,
        "terrain": [
          "########",
          "#------#",
          "#--.##-#",
          "#----.-#",
          "#-#--#-#",
          "#-#--#-#",
          "#-----.#",
          "########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 5,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Far Orbit 140",
          "concept": "counterintuitive-routing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 21,
      "optimalPushes": 6
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-141-counterintuitive-routing-teach",
        "revision": 2,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#-----.#",
          "#----.-#",
          "#------#",
          "#--##-.#",
          "#-####-#",
          "#-#----#",
          "#------#",
          "########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 1
          },
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 6,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Far Orbit 141",
          "concept": "introduce counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 29,
      "optimalPushes": 6
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-142-counterintuitive-routing-practice",
        "revision": 2,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#---------#",
          "#-##-##---#",
          "#.#---#---#",
          "#----#----#",
          "#-----##--#",
          "#--#---#--#",
          "#-#--#-.-.#",
          "#---------#",
          "###########"
        ],
        "initialPlayer": {
          "x": 9,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 1,
            "y": 4
          },
          {
            "x": 8,
            "y": 6
          },
          {
            "x": 8,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Far Orbit 142",
          "concept": "practice counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 57,
      "optimalPushes": 6
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-143-counterintuitive-routing-combine",
        "revision": 1,
        "width": 9,
        "height": 10,
        "terrain": [
          "#########",
          "#-------#",
          "#--##.--#",
          "#-----#-#",
          "#-#--.--#",
          "#-###-#-#",
          "#-#.#---#",
          "#-#--#--#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 3,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Far Orbit 143",
          "concept": "combine counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 44,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-144-counterintuitive-routing-test",
        "revision": 2,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#------#",
          "#.###--#",
          "#----#-#",
          "#.--#--#",
          "#------#",
          "#--#-#-#",
          "#-----.#",
          "########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 4
          },
          {
            "x": 3,
            "y": 5
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Far Orbit 144",
          "concept": "test counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 25,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-145-counterintuitive-routing-recover",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#-#####--#",
          "#..--###-#",
          "#----#---#",
          "#.----#--#",
          "#-#---#--#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 3
          },
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 4,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Far Orbit 145",
          "concept": "counterintuitive-routing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 24,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-146-counterintuitive-routing-teach",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#-#--###-#",
          "#-#--#---#",
          "#---####-#",
          "#.--#-#--#",
          "#--------#",
          "#-----..-#",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 4,
            "y": 6
          },
          {
            "x": 6,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Far Orbit 146",
          "concept": "introduce counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 29,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-147-counterintuitive-routing-practice",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#--####-.#",
          "#-#----#-#",
          "#-#--#---#",
          "#-#---##-#",
          "#-##.----#",
          "#--.-----#",
          "##########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 6,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Far Orbit 147",
          "concept": "practice counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 34,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-148-counterintuitive-routing-combine",
        "revision": 2,
        "width": 9,
        "height": 8,
        "terrain": [
          "#########",
          "#-------#",
          "#---.-#-#",
          "#--#-.#-#",
          "#-.###--#",
          "#---#---#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 2,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Far Orbit 148",
          "concept": "combine counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 26,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-149-counterintuitive-routing-test",
        "revision": 2,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#------#",
          "#.-#---#",
          "#.###-.#",
          "#-#-##-#",
          "#------#",
          "#------#",
          "#------#",
          "########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 1,
            "y": 4
          },
          {
            "x": 3,
            "y": 5
          },
          {
            "x": 5,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Far Orbit 149",
          "concept": "test counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 28,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-150-counterintuitive-routing-recover",
        "revision": 2,
        "width": 9,
        "height": 8,
        "terrain": [
          "#########",
          "#-------#",
          "#-#-#-#-#",
          "#-##----#",
          "#-#-#---#",
          "#.--.---#",
          "#----.--#",
          "#########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 3,
            "y": 5
          },
          {
            "x": 5,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Far Orbit 150",
          "concept": "counterintuitive-routing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 15,
      "optimalPushes": 6
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-151-multi-box-dependency-teach",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--.-----#",
          "#-#.-----#",
          "#--#-----#",
          "#-#.---#-#",
          "#--#--#--#",
          "#-#----#-#",
          "#---###--#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 5,
            "y": 3
          },
          {
            "x": 7,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Linked Observatory 151",
          "concept": "introduce multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 24,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-152-multi-box-dependency-practice",
        "revision": 2,
        "width": 9,
        "height": 8,
        "terrain": [
          "#########",
          "#-------#",
          "#-#--.#-#",
          "#-#.--#-#",
          "#.---##-#",
          "#--#----#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 5,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Linked Observatory 152",
          "concept": "practice multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 37,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-153-multi-box-dependency-combine",
        "revision": 2,
        "width": 8,
        "height": 8,
        "terrain": [
          "########",
          "#------#",
          "#-##-#-#",
          "#---#--#",
          "#--##--#",
          "#------#",
          "#-.-..-#",
          "########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 5,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Linked Observatory 153",
          "concept": "combine multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 39,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-154-multi-box-dependency-test",
        "revision": 2,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#---------#",
          "#-##----#-#",
          "#-####--#-#",
          "#----#----#",
          "#---#---#-#",
          "#-------.-#",
          "#-#----#-.#",
          "#--------.#",
          "###########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 8,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Linked Observatory 154",
          "concept": "test multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 37,
      "optimalPushes": 14
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-155-multi-box-dependency-recover",
        "revision": 2,
        "width": 9,
        "height": 8,
        "terrain": [
          "#########",
          "#--.----#",
          "#----#.-#",
          "#-#-##--#",
          "#-------#",
          "#-#-##--#",
          "#------.#",
          "#########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 6,
            "y": 5
          },
          {
            "x": 5,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Linked Observatory 155",
          "concept": "multi-box-dependency recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 23,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-156-multi-box-dependency-teach",
        "revision": 2,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#------#",
          "#-##-..#",
          "#-##---#",
          "#------#",
          "#------#",
          "#-###--#",
          "#----.-#",
          "########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 5,
            "y": 6
          },
          {
            "x": 2,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Linked Observatory 156",
          "concept": "introduce multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 35,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-157-multi-box-dependency-practice",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#.-.-----#",
          "#-###----#",
          "#-#-#----#",
          "#-.-#--#-#",
          "#---#-#--#",
          "#--------#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 3,
            "y": 6
          },
          {
            "x": 6,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Linked Observatory 157",
          "concept": "practice multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 42,
      "optimalPushes": 16
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-158-multi-box-dependency-combine",
        "revision": 1,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#----.--#",
          "#-#-###-#",
          "#-------#",
          "#-#.--#.#",
          "#---###-#",
          "#--#--#-#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 4,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Linked Observatory 158",
          "concept": "combine multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 45,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-159-multi-box-dependency-test",
        "revision": 1,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--------#",
          "#-###-##-#",
          "#.-###---#",
          "#.##---#-#",
          "#-#---#--#",
          "#---.-##-#",
          "#--------#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 3,
            "y": 6
          },
          {
            "x": 2,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Linked Observatory 159",
          "concept": "test multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 34,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-160-multi-box-dependency-recover",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#.-#--##-#",
          "#--####--#",
          "#---####-#",
          "#-#---.--#",
          "#-----.#-#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 3,
            "y": 5
          },
          {
            "x": 5,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Linked Observatory 160",
          "concept": "multi-box-dependency recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 33,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-161-multi-box-dependency-teach",
        "revision": 2,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#------#",
          "#-#-##-#",
          "#-#--#-#",
          "#------#",
          "#.-#---#",
          "#-#-##-#",
          "#.-.---#",
          "########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 2,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Linked Observatory 161",
          "concept": "introduce multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 49,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-162-multi-box-dependency-practice",
        "revision": 2,
        "width": 8,
        "height": 8,
        "terrain": [
          "########",
          "#------#",
          "#.##-#-#",
          "#--#-#-#",
          "#-.-.--#",
          "#--#---#",
          "#------#",
          "########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 5,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Linked Observatory 162",
          "concept": "practice multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 36,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-163-multi-box-dependency-combine",
        "revision": 2,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#---.##-#",
          "#-##-#--#",
          "#--#----#",
          "#-###-#-#",
          "#---#---#",
          "#.--.---#",
          "#########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 2,
            "y": 6
          },
          {
            "x": 2,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Linked Observatory 163",
          "concept": "combine multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 38,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-164-multi-box-dependency-test",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#-#---#--#",
          "#.##---#-#",
          "#-##-#-#-#",
          "#-----#--#",
          "#----#-#-#",
          "#----.-.-#",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 2,
            "y": 6
          },
          {
            "x": 3,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Linked Observatory 164",
          "concept": "test multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 41,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-165-multi-box-dependency-recover",
        "revision": 2,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#------.--#",
          "#-###--.--#",
          "#-----#-#-#",
          "#---#-----#",
          "#---#.--#-#",
          "#-##-#----#",
          "#-##------#",
          "#---------#",
          "###########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 3
          },
          {
            "x": 6,
            "y": 5
          },
          {
            "x": 7,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Linked Observatory 165",
          "concept": "multi-box-dependency recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 15,
      "optimalPushes": 6
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-166-multi-box-dependency-teach",
        "revision": 2,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#.------#",
          "#---#---#",
          "#----#--#",
          "#-#-##--#",
          "#---#---#",
          "#-#.###-#",
          "#-----.-#",
          "#########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 2,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Linked Observatory 166",
          "concept": "introduce multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 34,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-167-multi-box-dependency-practice",
        "revision": 2,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#----.-#",
          "#-#-#--#",
          "#-##-.-#",
          "#--#---#",
          "#--##--#",
          "#-----.#",
          "#------#",
          "########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 2,
            "y": 6
          },
          {
            "x": 5,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Linked Observatory 167",
          "concept": "practice multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 23,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-168-multi-box-dependency-combine",
        "revision": 2,
        "width": 9,
        "height": 8,
        "terrain": [
          "#########",
          "#-------#",
          "#--#--#-#",
          "#-#-.-#-#",
          "#-##-##.#",
          "#--#----#",
          "#-----.-#",
          "#########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 3
          },
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 4,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Linked Observatory 168",
          "concept": "combine multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 34,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-169-multi-box-dependency-test",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#-#----#-#",
          "#-#--###.#",
          "#------.-#",
          "#--##-#--#",
          "#-##--#--#",
          "#-.------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 5,
            "y": 6
          },
          {
            "x": 4,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Linked Observatory 169",
          "concept": "test multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 48,
      "optimalPushes": 14
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-170-multi-box-dependency-recover",
        "revision": 2,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-----.-#",
          "#--#.-#-#",
          "#-##-#--#",
          "#--#--#-#",
          "#--#-##-#",
          "#-------#",
          "#-----.-#",
          "#########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 1
          },
          {
            "x": 4,
            "y": 6
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Linked Observatory 170",
          "concept": "multi-box-dependency recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 26,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-171-multi-box-dependency-teach",
        "revision": 2,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#-.----#",
          "#-##-#-#",
          "#---.--#",
          "#-----.#",
          "#-##---#",
          "#-#-#--#",
          "#------#",
          "########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 3
          },
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 5,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Linked Observatory 171",
          "concept": "introduce multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 35,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-172-multi-box-dependency-practice",
        "revision": 2,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-----.-#",
          "#-#-##--#",
          "#.##--#-#",
          "#.---#--#",
          "#----##-#",
          "#-#-----#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 1
          },
          {
            "x": 3,
            "y": 4
          },
          {
            "x": 4,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Linked Observatory 172",
          "concept": "practice multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 41,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-173-multi-box-dependency-combine",
        "revision": 2,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#--.----#",
          "#---#-#-#",
          "#-#.-##-#",
          "#-.-----#",
          "#-##-##-#",
          "#-##----#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 5,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Linked Observatory 173",
          "concept": "combine multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 53,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-174-multi-box-dependency-test",
        "revision": 2,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#------#",
          "#----#-#",
          "#-#----#",
          "#---##.#",
          "#---##-#",
          "#-#.---#",
          "#----.-#",
          "########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 2,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Linked Observatory 174",
          "concept": "test multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 44,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-175-multi-box-dependency-recover",
        "revision": 2,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#-.---#-#",
          "#-#---#-#",
          "#-----#.#",
          "#--#-#--#",
          "#-#-###-#",
          "#.------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 3,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Linked Observatory 175",
          "concept": "multi-box-dependency recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 27,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-176-multi-box-dependency-teach",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#--#--##-#",
          "#-#-#----#",
          "#-#---#--#",
          "#------#.#",
          "#----.-#-#",
          "#-------.#",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 7,
            "y": 3
          },
          {
            "x": 5,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Linked Observatory 176",
          "concept": "introduce multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 47,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-177-multi-box-dependency-practice",
        "revision": 2,
        "width": 9,
        "height": 8,
        "terrain": [
          "#########",
          "#-------#",
          "#---###.#",
          "#-----.-#",
          "#--#--#-#",
          "#--##---#",
          "#--.----#",
          "#########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 2,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Linked Observatory 177",
          "concept": "practice multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 30,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-178-multi-box-dependency-combine",
        "revision": 2,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#--##---#",
          "#-##-##-#",
          "#-----#-#",
          "#---##--#",
          "#---..#-#",
          "#------.#",
          "#########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 6
          },
          {
            "x": 3,
            "y": 6
          },
          {
            "x": 3,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Linked Observatory 178",
          "concept": "combine multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 18,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-179-multi-box-dependency-test",
        "revision": 2,
        "width": 9,
        "height": 8,
        "terrain": [
          "#########",
          "#-----..#",
          "#--#--#-#",
          "#-#---#-#",
          "#-#-----#",
          "#---#-#-#",
          "#--.----#",
          "#########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 5,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Linked Observatory 179",
          "concept": "test multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 35,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-180-multi-box-dependency-recover",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#-#--#-#-#",
          "#-#-#--#-#",
          "#-#------#",
          "#---.-#--#",
          "#--#.###-#",
          "#.-------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 2,
            "y": 6
          },
          {
            "x": 3,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Linked Observatory 180",
          "concept": "multi-box-dependency recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 33,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-181-mixed-mastery-teach",
        "revision": 2,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#-###-#-#",
          "#--#--#-#",
          "#-.--##-#",
          "#----#--#",
          "#.#-----#",
          "#-----.-#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 3,
            "y": 6
          },
          {
            "x": 6,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Grand Constellation 181",
          "concept": "introduce mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 37,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-182-mixed-mastery-practice",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#--#---.-#",
          "#---#----#",
          "#-----##-#",
          "#------.-#",
          "#-#####-.#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 4,
            "y": 4
          },
          {
            "x": 7,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Grand Constellation 182",
          "concept": "practice mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 46,
      "optimalPushes": 14
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-183-mixed-mastery-combine",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#.#----#-#",
          "#--.---#-#",
          "#-#---##-#",
          "#---.#---#",
          "#-#----#-#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 4,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Grand Constellation 183",
          "concept": "combine mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 24,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-184-mixed-mastery-test",
        "revision": 2,
        "width": 8,
        "height": 9,
        "terrain": [
          "########",
          "#---..-#",
          "#---#--#",
          "#---#.-#",
          "#----#-#",
          "#--###-#",
          "#---#--#",
          "#------#",
          "########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 2,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Grand Constellation 184",
          "concept": "test mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 31,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-185-mixed-mastery-recover",
        "revision": 2,
        "width": 8,
        "height": 8,
        "terrain": [
          "########",
          "#------#",
          "#.##-#-#",
          "#---#--#",
          "#.---#-#",
          "#----#-#",
          "#-----.#",
          "########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 3,
            "y": 4
          },
          {
            "x": 5,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Grand Constellation 185",
          "concept": "mixed-mastery recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 28,
      "optimalPushes": 6
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-186-mixed-mastery-teach",
        "revision": 2,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#---------#",
          "#---#-----#",
          "#----#-#--#",
          "#-#--.----#",
          "#----##---#",
          "#-#-##----#",
          "#-####----#",
          "#----.-.--#",
          "###########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 8,
            "y": 3
          },
          {
            "x": 8,
            "y": 5
          },
          {
            "x": 7,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Grand Constellation 186",
          "concept": "introduce mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 28,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-187-mixed-mastery-practice",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#---------#",
          "#-##--###.#",
          "#--#.----.#",
          "#-#-------#",
          "#--#-#----#",
          "#---#-----#",
          "#--#---##-#",
          "#---------#",
          "###########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 8,
            "y": 5
          },
          {
            "x": 8,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Grand Constellation 187",
          "concept": "practice mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 30,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-188-mixed-mastery-combine",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#--#-----#",
          "#----#-#-#",
          "#-#--#---#",
          "#-#---#--#",
          "#--##.---#",
          "#-..-----#",
          "##########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 6,
            "y": 6
          },
          {
            "x": 7,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Grand Constellation 188",
          "concept": "combine mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 24,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-189-mixed-mastery-test",
        "revision": 1,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#----..---#",
          "#-#--#----#",
          "#--#-##---#",
          "#------#--#",
          "#-##---#--#",
          "#----#----#",
          "#-------#-#",
          "#-####.---#",
          "#---------#",
          "###########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 8,
            "y": 2
          },
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 8,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Grand Constellation 189",
          "concept": "test mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 39,
      "optimalPushes": 14
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-190-mixed-mastery-recover",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#-------.#",
          "#.----#--#",
          "#-----.#-#",
          "#--#####-#",
          "#--#-----#",
          "#-----#--#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 2,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Grand Constellation 190",
          "concept": "mixed-mastery recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 22,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-191-mixed-mastery-teach",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#.-#.#-#-#",
          "#----#---#",
          "#--#--#--#",
          "#---#--#-#",
          "#.-----#-#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 1,
            "y": 5
          },
          {
            "x": 4,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Grand Constellation 191",
          "concept": "introduce mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 34,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-192-mixed-mastery-practice",
        "revision": 2,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#----..-#",
          "#---#---#",
          "#-#.#---#",
          "#--###--#",
          "#-#--#--#",
          "#-##----#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 6,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Grand Constellation 192",
          "concept": "practice mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 37,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-193-mixed-mastery-combine",
        "revision": 2,
        "width": 9,
        "height": 8,
        "terrain": [
          "#########",
          "#--.----#",
          "#-#---#.#",
          "#-#--#-.#",
          "#-------#",
          "#-#-#-#-#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 5,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Grand Constellation 193",
          "concept": "combine mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 53,
      "optimalPushes": 14
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-194-mixed-mastery-test",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#-----..-#",
          "#-#-##-#.#",
          "#---#----#",
          "#-#-#----#",
          "#------#-#",
          "#------#-#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 3
          },
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 6,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Grand Constellation 194",
          "concept": "test mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 46,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-195-mixed-mastery-recover",
        "revision": 2,
        "width": 9,
        "height": 8,
        "terrain": [
          "#########",
          "#-------#",
          "#-#---#-#",
          "#-#-#-#.#",
          "#.----#-#",
          "#-#-----#",
          "#------.#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 1,
            "y": 3
          },
          {
            "x": 5,
            "y": 3
          },
          {
            "x": 5,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Grand Constellation 195",
          "concept": "mixed-mastery recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 33,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-196-mixed-mastery-teach",
        "revision": 2,
        "width": 9,
        "height": 8,
        "terrain": [
          "#########",
          "#-------#",
          "#-#.-#--#",
          "#-#-----#",
          "#-#--#-.#",
          "#-##----#",
          "#---.---#",
          "#########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 6,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Grand Constellation 196",
          "concept": "introduce mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 28,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-197-mixed-mastery-practice",
        "revision": 2,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#-------#",
          "#--#----#",
          "#-.--##-#",
          "#-----#-#",
          "#---##--#",
          "#--####-#",
          "#----..-#",
          "#########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 3,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Grand Constellation 197",
          "concept": "practice mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 30,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-198-mixed-mastery-combine",
        "revision": 2,
        "width": 9,
        "height": 8,
        "terrain": [
          "#########",
          "#-.-----#",
          "#----#--#",
          "#--#--#-#",
          "#----#--#",
          "#-##-#--#",
          "#-..----#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 4,
            "y": 4
          },
          {
            "x": 6,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Grand Constellation 198",
          "concept": "combine mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 51,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-199-mixed-mastery-test",
        "revision": 1,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#---------#",
          "#-#--###--#",
          "#-#--#----#",
          "#-----#---#",
          "#-#-#-----#",
          "#--###----#",
          "#-#-#-.---#",
          "#-#..-----#",
          "#---------#",
          "###########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 8
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 8,
            "y": 7
          },
          {
            "x": 7,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Grand Constellation 199",
          "concept": "test mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 25,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-200-mixed-mastery-recover",
        "revision": 2,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--------#",
          "#---#--#.#",
          "#----##--#",
          "#--###--.#",
          "#---##--.#",
          "#--------#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 6,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Grand Constellation 200",
          "concept": "mixed-mastery recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 24,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-31-sequencing-teach",
        "revision": 3,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#####-.##",
          "####-#.-#",
          "###---.-#",
          "#------##",
          "#-------#",
          "#-------#",
          "#-------#",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 5,
            "y": 3
          },
          {
            "x": 6,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 031",
          "concept": "introduce sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 26,
      "optimalPushes": 11
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-32-sequencing-practice",
        "revision": 3,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#####----#",
          "###--##-##",
          "###-.----#",
          "####-----#",
          "##--.----#",
          "##-------#",
          "####----.#",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 3
          },
          {
            "x": 3,
            "y": 6
          },
          {
            "x": 4,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 032",
          "concept": "practice sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 37,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-33-sequencing-combine",
        "revision": 3,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#####-#-#",
          "####----#",
          "###----##",
          "###---#-#",
          "##.-----#",
          "#-..-#--#",
          "#---#---#",
          "#########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 4,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Star Sequence 033",
          "concept": "combine sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 36,
      "optimalPushes": 13
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-34-sequencing-test",
        "revision": 3,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "######--##",
          "#####.#--#",
          "##---..--#",
          "##-------#",
          "##--###--#",
          "###-##---#",
          "#######--#",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 7,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Star Sequence 034",
          "concept": "test sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 45,
      "optimalPushes": 16
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-35-sequencing-recover",
        "revision": 3,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "##########",
          "#####-#--#",
          "#####--.-#",
          "######---#",
          "##--##---#",
          "###-#----#",
          "###-.----#",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 5
          },
          {
            "x": 6,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 035",
          "concept": "sequencing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 13,
      "optimalPushes": 8
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-36-sequencing-teach",
        "revision": 3,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "##########",
          "#######-##",
          "#####-#--#",
          "#-##-----#",
          "#---#-####",
          "#--#-----#",
          "#-----.-##",
          "#.---.-###",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 8
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 7
          },
          {
            "x": 4,
            "y": 7
          },
          {
            "x": 4,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Star Sequence 036",
          "concept": "introduce sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 25,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-37-sequencing-practice",
        "revision": 3,
        "width": 9,
        "height": 10,
        "terrain": [
          "#########",
          "##-######",
          "#----####",
          "##-#--###",
          "#----##-#",
          "#---#-#-#",
          "#.#-----#",
          "#.--#-###",
          "#.#---###",
          "#########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 1,
            "y": 5
          },
          {
            "x": 3,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Star Sequence 037",
          "concept": "practice sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 45,
      "optimalPushes": 13
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-38-sequencing-combine",
        "revision": 3,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#.---#--#",
          "#.------#",
          "#.------#",
          "#--#--#-#",
          "##-#-####",
          "##-######",
          "#########",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 3,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Star Sequence 038",
          "concept": "combine sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 27,
      "optimalPushes": 14
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-39-sequencing-test",
        "revision": 3,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "###-#--#-#",
          "#-------.#",
          "#----#---#",
          "###.-.#-##",
          "##-----###",
          "#--#-#####",
          "#-----####",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 4,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Star Sequence 039",
          "concept": "test sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 45,
      "optimalPushes": 17
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-40-sequencing-recover",
        "revision": 3,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "##########",
          "#####-####",
          "#####--###",
          "##--#-####",
          "###--.-###",
          "##-----###",
          "#.---#--##",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 3
          },
          {
            "x": 3,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 040",
          "concept": "sequencing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 28,
      "optimalPushes": 9
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-41-sequencing-teach",
        "revision": 3,
        "width": 9,
        "height": 10,
        "terrain": [
          "#########",
          "####-#--#",
          "#-------#",
          "#------##",
          "##------#",
          "##--.-###",
          "####.####",
          "####.####",
          "#########",
          "#########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 3,
            "y": 3
          },
          {
            "x": 4,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Star Sequence 041",
          "concept": "introduce sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 25,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-42-sequencing-practice",
        "revision": 3,
        "width": 9,
        "height": 10,
        "terrain": [
          "#########",
          "#---...##",
          "#-#--#-##",
          "#----####",
          "#---#####",
          "#---#####",
          "#--#--###",
          "#----####",
          "##-----##",
          "#########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 1
          },
          {
            "x": 3,
            "y": 4
          },
          {
            "x": 2,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Star Sequence 042",
          "concept": "practice sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 48,
      "optimalPushes": 14
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-43-sequencing-combine",
        "revision": 4,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--.---#-#",
          "#-#-#----#",
          "#--.-----#",
          "#.--#--###",
          "###--#####",
          "##########",
          "##########",
          "##########",
          "##########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 1
          },
          {
            "x": 5,
            "y": 3
          },
          {
            "x": 3,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Star Sequence 043",
          "concept": "combine sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 49,
      "optimalPushes": 15
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-44-sequencing-test",
        "revision": 3,
        "width": 9,
        "height": 10,
        "terrain": [
          "#########",
          "#-..#-###",
          "#-.#----#",
          "#------##",
          "#-------#",
          "#----#-##",
          "#--#---##",
          "#--######",
          "##-######",
          "#########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 8
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 2,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Star Sequence 044",
          "concept": "test sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 49,
      "optimalPushes": 18
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-45-sequencing-recover",
        "revision": 3,
        "width": 9,
        "height": 10,
        "terrain": [
          "#########",
          "#-----###",
          "#-----###",
          "#------##",
          "#----..##",
          "#-###-###",
          "#####-###",
          "#####-###",
          "#########",
          "#########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 5,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 045",
          "concept": "sequencing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 22,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-46-sequencing-teach",
        "revision": 4,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#####----#",
          "#######--#",
          "####-##--#",
          "##--.----#",
          "#------.##",
          "###-#-#--#",
          "###-#-##-#",
          "##--#.####",
          "##########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 5,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Star Sequence 046",
          "concept": "introduce sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 32,
      "optimalPushes": 13
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-47-sequencing-practice",
        "revision": 3,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "######-###",
          "####---###",
          "#####--###",
          "####---###",
          "####---###",
          "#####.--##",
          "##.----.-#",
          "##------##",
          "##########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 6,
            "y": 5
          },
          {
            "x": 6,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 047",
          "concept": "practice sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 37,
      "optimalPushes": 15
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-48-sequencing-combine",
        "revision": 3,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#---..#-#",
          "###--.--#",
          "##------#",
          "###-----#",
          "####----#",
          "####-#--#",
          "###--#--#",
          "#########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 6,
            "y": 5
          },
          {
            "x": 6,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 048",
          "concept": "combine sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 40,
      "optimalPushes": 17
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-49-sequencing-test",
        "revision": 3,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#####----#",
          "####--#--#",
          "####-----#",
          "###.--#--#",
          "#-#---#-##",
          "#----.--##",
          "##----.-##",
          "##########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 3
          },
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 7,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 049",
          "concept": "test sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 50,
      "optimalPushes": 19
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-50-sequencing-recover",
        "revision": 3,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "##########",
          "#-##-#####",
          "#-#--#####",
          "#-----####",
          "#-----####",
          "#-----.###",
          "##--.--###",
          "####--####",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 2,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Star Sequence 050",
          "concept": "sequencing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 19,
      "optimalPushes": 10
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-51-sequencing-teach",
        "revision": 3,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "##--######",
          "##--######",
          "###.--####",
          "###-######",
          "#-------##",
          "###-#--#-#",
          "###------#",
          "###.--.-##",
          "##########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 4,
            "y": 7
          },
          {
            "x": 5,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Star Sequence 051",
          "concept": "introduce sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 23,
      "optimalPushes": 14
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-52-sequencing-practice",
        "revision": 3,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "######---#",
          "######---#",
          "#####.#--#",
          "####----##",
          "##--#----#",
          "##-----..#",
          "###-#-####",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 3
          },
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 5,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 052",
          "concept": "practice sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 32,
      "optimalPushes": 16
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-53-sequencing-combine",
        "revision": 3,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "####---##",
          "###-----#",
          "##-#---##",
          "##---#--#",
          "#-----#-#",
          "##----#-#",
          "###--...#",
          "#########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 4,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 053",
          "concept": "combine sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 48,
      "optimalPushes": 18
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-54-sequencing-test",
        "revision": 3,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "##-.---#-#",
          "#-------.#",
          "###--#---#",
          "#####-.-##",
          "#####----#",
          "####-##--#",
          "###------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 3
          },
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 7,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 054",
          "concept": "test sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 50,
      "optimalPushes": 19
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-55-sequencing-recover",
        "revision": 3,
        "width": 9,
        "height": 10,
        "terrain": [
          "#########",
          "##--#####",
          "#.---####",
          "#.---####",
          "#-----###",
          "###-----#",
          "#---#####",
          "##--#####",
          "#########",
          "#########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 4
          },
          {
            "x": 2,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 055",
          "concept": "sequencing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 25,
      "optimalPushes": 11
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-56-sequencing-teach",
        "revision": 3,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#----##--#",
          "###---##-#",
          "####-----#",
          "###.---.-#",
          "#####--.##",
          "####-##-##",
          "####-----#",
          "####-#---#",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 5,
            "y": 3
          },
          {
            "x": 6,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Star Sequence 056",
          "concept": "introduce sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 40,
      "optimalPushes": 15
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-57-sequencing-practice",
        "revision": 3,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#.#-######",
          "#---##-###",
          "#---##---#",
          "#.----.###",
          "#-------##",
          "#-#----###",
          "##----####",
          "####-#####",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 8
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 5,
            "y": 6
          },
          {
            "x": 4,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Star Sequence 057",
          "concept": "practice sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 34,
      "optimalPushes": 17
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-58-sequencing-combine",
        "revision": 3,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "####.--.-#",
          "#####----#",
          "##-------#",
          "###-###-.#",
          "##--###--#",
          "###-##---#",
          "#######-##",
          "##########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 3
          },
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 8,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Star Sequence 058",
          "concept": "combine sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 41,
      "optimalPushes": 19
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-59-sequencing-test",
        "revision": 3,
        "width": 9,
        "height": 10,
        "terrain": [
          "#########",
          "#####--##",
          "####--###",
          "##----###",
          "##----###",
          "####---##",
          "#.#-----#",
          "#.-----##",
          "#.-----##",
          "#########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 4
          },
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 6,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Star Sequence 059",
          "concept": "test sequencing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 47,
      "optimalPushes": 22
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-60-sequencing-recover",
        "revision": 3,
        "width": 9,
        "height": 10,
        "terrain": [
          "#########",
          "####-##-#",
          "##..----#",
          "###-----#",
          "###-#-#-#",
          "###-#---#",
          "####--#-#",
          "######--#",
          "#########",
          "#########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 3
          },
          {
            "x": 5,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Star Sequence 060",
          "concept": "sequencing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 37,
      "optimalPushes": 11
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-61-staging-order-teach",
        "revision": 3,
        "width": 10,
        "height": 11,
        "terrain": [
          "##########",
          "###-#-####",
          "###-#-####",
          "#-----####",
          "##----#-##",
          "#-----#-##",
          "#---#----#",
          "#-#---####",
          "###---...#",
          "#---#--.##",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 8
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 7
          },
          {
            "x": 4,
            "y": 7
          },
          {
            "x": 5,
            "y": 8
          },
          {
            "x": 6,
            "y": 9
          }
        ],
        "metadata": {
          "title": "Starlight Stage 061",
          "concept": "introduce staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 41,
      "optimalPushes": 16
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-62-staging-order-practice",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#.--##----#",
          "#---#---#-#",
          "#--------##",
          "#.#-#-#---#",
          "######----#",
          "#######.-.#",
          "#########-#",
          "###########",
          "###########",
          "###########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 1,
            "y": 2
          },
          {
            "x": 8,
            "y": 4
          },
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 9,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Starlight Stage 062",
          "concept": "practice staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 47,
      "optimalPushes": 18
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-63-staging-order-combine",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "###########",
          "###.#######",
          "#---#######",
          "#----######",
          "##---.#####",
          "##----#####",
          "#---#--#-##",
          "##-------##",
          "#.-.----###",
          "###########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 8
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 8
          },
          {
            "x": 5,
            "y": 8
          },
          {
            "x": 7,
            "y": 8
          },
          {
            "x": 5,
            "y": 9
          }
        ],
        "metadata": {
          "title": "Starlight Stage 063",
          "concept": "combine staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 32,
      "optimalPushes": 19
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-64-staging-order-test",
        "revision": 2,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "###########",
          "##-#--#####",
          "#--#---####",
          "#-.----##.#",
          "#--##-###-#",
          "#----####-#",
          "#-----###.#",
          "#.--------#",
          "#---#-#---#",
          "###########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 9
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 6
          },
          {
            "x": 2,
            "y": 7
          },
          {
            "x": 3,
            "y": 8
          },
          {
            "x": 4,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Starlight Stage 064",
          "concept": "test staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 41,
      "optimalPushes": 22
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-65-staging-order-recover",
        "revision": 3,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "##########",
          "######-###",
          "######-###",
          "#####--###",
          "###.##---#",
          "##-------#",
          "#----.---#",
          "#-.------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 2,
            "y": 7
          },
          {
            "x": 6,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Starlight Stage 065",
          "concept": "staging-order recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 29,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-66-staging-order-teach",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "######--#-#",
          "#######---#",
          "####.----##",
          "####------#",
          "###--#----#",
          "####.--.--#",
          "####------#",
          "####---.-##",
          "###########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 8,
            "y": 3
          },
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 8,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Starlight Stage 066",
          "concept": "introduce staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 32,
      "optimalPushes": 16
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-67-staging-order-practice",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "###########",
          "###-###-###",
          "###---#-###",
          "#-#.#-#--##",
          "#.---.##--#",
          "#---##----#",
          "#----##-###",
          "#---------#",
          "#------.###",
          "###########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 7
          },
          {
            "x": 7,
            "y": 7
          },
          {
            "x": 3,
            "y": 8
          },
          {
            "x": 6,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Starlight Stage 067",
          "concept": "practice staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 38,
      "optimalPushes": 18
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-68-staging-order-combine",
        "revision": 3,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#######.##",
          "#######.##",
          "#####--..#",
          "###---#--#",
          "###------#",
          "#-#------#",
          "#-----#--#",
          "##----##-#",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 7,
            "y": 6
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 068",
          "concept": "combine staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 48,
      "optimalPushes": 20
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-69-staging-order-test",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "####-######",
          "#-##--#####",
          "#---.######",
          "##.----####",
          "#------####",
          "#-#-----###",
          "#.------###",
          "#.#-----###",
          "##-----####",
          "###########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 7
          },
          {
            "x": 6,
            "y": 7
          },
          {
            "x": 5,
            "y": 8
          },
          {
            "x": 6,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Starlight Stage 069",
          "concept": "test staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 49,
      "optimalPushes": 23
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-70-staging-order-recover",
        "revision": 3,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#.----####",
          "##--#-####",
          "##----####",
          "##---#####",
          "#-#---####",
          "#--#-----#",
          "#-.--#--##",
          "##-#.-#--#",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 3,
            "y": 3
          },
          {
            "x": 3,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 070",
          "concept": "staging-order recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 27,
      "optimalPushes": 12
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-71-staging-order-teach",
        "revision": 3,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "###-#-####",
          "###-#---##",
          "##--##---#",
          "##---#---#",
          "#...----##",
          "#-.----#-#",
          "#-#------#",
          "#-#------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 3
          },
          {
            "x": 4,
            "y": 6
          },
          {
            "x": 5,
            "y": 7
          },
          {
            "x": 7,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 071",
          "concept": "introduce staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 40,
      "optimalPushes": 17
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-72-staging-order-practice",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#######--##",
          "######-#.-#",
          "###--#-#.##",
          "####-#----#",
          "####------#",
          "#######-###",
          "#####.----#",
          "####------#",
          "####-#--.##",
          "###########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 9
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 7
          },
          {
            "x": 7,
            "y": 8
          },
          {
            "x": 8,
            "y": 8
          },
          {
            "x": 7,
            "y": 9
          }
        ],
        "metadata": {
          "title": "Starlight Stage 072",
          "concept": "practice staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 41,
      "optimalPushes": 19
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-73-staging-order-combine",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "###.----.-#",
          "#####-----#",
          "##-------##",
          "###-#-#---#",
          "####--#-###",
          "##--#.----#",
          "##---.-##-#",
          "#####-###-#",
          "###########",
          "###########"
        ],
        "initialPlayer": {
          "x": 9,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 1
          },
          {
            "x": 8,
            "y": 3
          },
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 8,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Starlight Stage 073",
          "concept": "combine staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 41,
      "optimalPushes": 21
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-74-staging-order-test",
        "revision": 4,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "###--..#-#",
          "##-#-..--#",
          "#------###",
          "#-#-----##",
          "#-----#--#",
          "#--#---###",
          "#-###----#",
          "#-###----#",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 5,
            "y": 7
          },
          {
            "x": 7,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 074",
          "concept": "test staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 59,
      "optimalPushes": 24
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-75-staging-order-recover",
        "revision": 3,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "##--#-#.##",
          "#-#.--#--#",
          "#----.---#",
          "#####---##",
          "###------#",
          "###-#----#",
          "#####----#",
          "####----##",
          "##########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 6,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 075",
          "concept": "staging-order recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 27,
      "optimalPushes": 13
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-76-staging-order-teach",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "####---####",
          "#--#-#-####",
          "#-----.#--#",
          "#---------#",
          "###------##",
          "#.-.-.-#-##",
          "#----######",
          "##-#--#####",
          "####-######",
          "###########"
        ],
        "initialPlayer": {
          "x": 9,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 8,
            "y": 4
          },
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 7,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Starlight Stage 076",
          "concept": "introduce staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 31,
      "optimalPushes": 17
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-77-staging-order-practice",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "###########",
          "#-####-####",
          "#.###--####",
          "#-.#--#####",
          "#--#---####",
          "#-.------##",
          "#-----.-###",
          "##-------##",
          "#---------#",
          "###########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 6
          },
          {
            "x": 5,
            "y": 7
          },
          {
            "x": 3,
            "y": 8
          },
          {
            "x": 7,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Starlight Stage 077",
          "concept": "practice staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 45,
      "optimalPushes": 20
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-78-staging-order-combine",
        "revision": 3,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "###-----##",
          "######---#",
          "#####----#",
          "####-----#",
          "#....----#",
          "#--#----##",
          "#-#----###",
          "###------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 8
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 5,
            "y": 7
          },
          {
            "x": 6,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 078",
          "concept": "combine staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 50,
      "optimalPushes": 21
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-79-staging-order-test",
        "revision": 2,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#----##--##",
          "#..-##.-###",
          "#--##---###",
          "#------.###",
          "#------####",
          "#------####",
          "#-----#####",
          "#--########",
          "###########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 5,
            "y": 6
          },
          {
            "x": 1,
            "y": 7
          },
          {
            "x": 4,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 079",
          "concept": "test staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 49,
      "optimalPushes": 25
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-80-staging-order-recover",
        "revision": 3,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "##########",
          "##########",
          "#---##--##",
          "#---.---##",
          "##----#--#",
          "#-#-#----#",
          "#.-.-----#",
          "#-#------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 6,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 080",
          "concept": "staging-order recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 26,
      "optimalPushes": 13
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-81-staging-order-teach",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#######-#-#",
          "##-###----#",
          "#---#-#---#",
          "##----..--#",
          "##--#.---##",
          "####.----##",
          "######---##",
          "######--###",
          "###########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 4
          },
          {
            "x": 8,
            "y": 4
          },
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 8,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Starlight Stage 081",
          "concept": "introduce staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 49,
      "optimalPushes": 18
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-82-staging-order-practice",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "###########",
          "###--###-##",
          "#..----#--#",
          "##-##----##",
          "#..----#--#",
          "#-------###",
          "#-#------##",
          "####------#",
          "###########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 4,
            "y": 6
          },
          {
            "x": 5,
            "y": 6
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 082",
          "concept": "practice staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 48,
      "optimalPushes": 20
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-83-staging-order-combine",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#.-#-#-####",
          "#------####",
          "#--.---####",
          "#--.----###",
          "#--##-#####",
          "#-#-#---###",
          "#--.##-####",
          "#----######",
          "#-----#####",
          "###########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 1,
            "y": 6
          },
          {
            "x": 2,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Starlight Stage 083",
          "concept": "combine staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 44,
      "optimalPushes": 21
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-84-staging-order-test",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "##-----.--#",
          "#-.----.--#",
          "##-#---##-#",
          "##------###",
          "#.---######",
          "##------###",
          "##-#--#####",
          "####---####",
          "###########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 3,
            "y": 4
          },
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 3,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Starlight Stage 084",
          "concept": "test staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 49,
      "optimalPushes": 26
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-85-staging-order-recover",
        "revision": 3,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#-#-.----#",
          "#-------##",
          "##----####",
          "#-----####",
          "##--.-####",
          "###--#####",
          "#-----####",
          "##--.--###",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 1
          },
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 4,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 085",
          "concept": "staging-order recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 44,
      "optimalPushes": 13
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-86-staging-order-teach",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#------.-##",
          "#.-----####",
          "#-#------##",
          "##--#--#--#",
          "#-.--.-#--#",
          "#--####--##",
          "#-######-##",
          "###########",
          "###########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 1
          },
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 3,
            "y": 4
          },
          {
            "x": 3,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Starlight Stage 086",
          "concept": "introduce staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 38,
      "optimalPushes": 18
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-87-staging-order-practice",
        "revision": 3,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "##-#######",
          "##.#######",
          "##..--####",
          "##.--#-###",
          "###--#---#",
          "#--------#",
          "#--------#",
          "#--#-----#",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 4
          },
          {
            "x": 5,
            "y": 6
          },
          {
            "x": 7,
            "y": 6
          },
          {
            "x": 4,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 087",
          "concept": "practice staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 61,
      "optimalPushes": 21
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-88-staging-order-combine",
        "revision": 3,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "######-.##",
          "#####-#.-#",
          "##-#--..##",
          "#--#-----#",
          "#-------##",
          "##-------#",
          "#--------#",
          "#-###----#",
          "##########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 4,
            "y": 7
          },
          {
            "x": 5,
            "y": 7
          },
          {
            "x": 6,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 088",
          "concept": "combine staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 51,
      "optimalPushes": 23
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-89-staging-order-test",
        "revision": 2,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "##-...-###",
          "#-#--.-###",
          "#-------##",
          "#--------#",
          "#-----##-#",
          "#---#-####",
          "##----####",
          "###--#####",
          "##########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 3,
            "y": 6
          },
          {
            "x": 3,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 089",
          "concept": "test staging-order",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 53,
      "optimalPushes": 25
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-90-staging-order-recover",
        "revision": 3,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#----.####",
          "#-----####",
          "#-----##-#",
          "#--------#",
          "#--#-##-##",
          "#.#--##--#",
          "#-.---#-##",
          "##########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 3,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Starlight Stage 090",
          "concept": "staging-order recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 35,
      "optimalPushes": 14
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-91-congestion-teach",
        "revision": 3,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#----#-###",
          "##-----#-#",
          "##-#--#--#",
          "##-------#",
          "###------#",
          "##-----..#",
          "#####--..#",
          "#####-#--#",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 5,
            "y": 3
          },
          {
            "x": 5,
            "y": 6
          },
          {
            "x": 6,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Cloud Junction 091",
          "concept": "introduce congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 47,
      "optimalPushes": 20
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-92-congestion-practice",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "##-########",
          "##--#######",
          "#-.########",
          "##-##--####",
          "#-------.-#",
          "#--########",
          "#-----##--#",
          "#------..##",
          "###########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 2,
            "y": 7
          },
          {
            "x": 3,
            "y": 8
          },
          {
            "x": 6,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Cloud Junction 092",
          "concept": "practice congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 51,
      "optimalPushes": 21
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-93-congestion-combine",
        "revision": 3,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "######--##",
          "######--##",
          "#####---##",
          "##-##--###",
          "#--#---#-#",
          "#-.#-----#",
          "#-...----#",
          "###--##-##",
          "##########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 7,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Cloud Junction 093",
          "concept": "combine congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 56,
      "optimalPushes": 23
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-94-congestion-test",
        "revision": 2,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#####--###",
          "#.##-----#",
          "#.-###-###",
          "#..----###",
          "#-#-----##",
          "#-------##",
          "#-------##",
          "#------###",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 4,
            "y": 7
          },
          {
            "x": 6,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Cloud Junction 094",
          "concept": "test congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 61,
      "optimalPushes": 28
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-95-congestion-recover",
        "revision": 3,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#--.#-####",
          "#------#-#",
          "#---#----#",
          "##--#.-#-#",
          "#---#-####",
          "#--#-#--##",
          "#---.--###",
          "##########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 7,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Cloud Junction 095",
          "concept": "congestion recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 25,
      "optimalPushes": 14
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-96-congestion-teach",
        "revision": 3,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#-#-##--.#",
          "#---#--..#",
          "##-#-##-.#",
          "##----#--#",
          "#---#----#",
          "##-#-----#",
          "##-#-#---#",
          "####-#-#-#",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 8
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 7,
            "y": 6
          },
          {
            "x": 8,
            "y": 6
          },
          {
            "x": 6,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Cloud Junction 096",
          "concept": "introduce congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 40,
      "optimalPushes": 18
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-97-congestion-practice",
        "revision": 3,
        "width": 10,
        "height": 11,
        "terrain": [
          "##########",
          "####.-####",
          "####.-####",
          "####.---##",
          "##-#.---##",
          "##-------#",
          "##-------#",
          "###-----##",
          "####-----#",
          "###------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 8
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 6
          },
          {
            "x": 4,
            "y": 7
          },
          {
            "x": 5,
            "y": 7
          },
          {
            "x": 4,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Cloud Junction 097",
          "concept": "practice congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 49,
      "optimalPushes": 22
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-98-congestion-combine",
        "revision": 3,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#######--#",
          "#####-##-#",
          "##-#-----#",
          "#--###---#",
          "#--------#",
          "#...-----#",
          "#--.#---##",
          "###------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 5
          },
          {
            "x": 6,
            "y": 6
          },
          {
            "x": 7,
            "y": 6
          },
          {
            "x": 7,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Cloud Junction 098",
          "concept": "combine congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 56,
      "optimalPushes": 24
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-99-congestion-test",
        "revision": 2,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "####-######",
          "###.--.####",
          "##------###",
          "#.--------#",
          "#---##----#",
          "#.#--#---##",
          "##--#--####",
          "#####---###",
          "###########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 8
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 8,
            "y": 5
          },
          {
            "x": 6,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Cloud Junction 099",
          "concept": "test congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 56,
      "optimalPushes": 27
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-100-congestion-recover",
        "revision": 3,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#-##-#--##",
          "#----.---#",
          "##-#-----#",
          "#####---.#",
          "####----##",
          "####----.#",
          "######-###",
          "##########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 5,
            "y": 3
          },
          {
            "x": 6,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Cloud Junction 100",
          "concept": "congestion recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 21,
      "optimalPushes": 13
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-101-congestion-teach",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#.------###",
          "#..-----###",
          "#-#---#####",
          "#-----#####",
          "#-#----####",
          "##---.#####",
          "###--######",
          "####-######",
          "###--######",
          "###########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 9
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 1
          },
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 3,
            "y": 6
          },
          {
            "x": 4,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Cloud Junction 101",
          "concept": "introduce congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 42,
      "optimalPushes": 20
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-102-congestion-practice",
        "revision": 3,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#--#######",
          "#-########",
          "#...-#####",
          "#.----##-#",
          "#--------#",
          "#-#-----##",
          "##---#---#",
          "#---####-#",
          "##########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 8
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 5
          },
          {
            "x": 4,
            "y": 6
          },
          {
            "x": 6,
            "y": 6
          },
          {
            "x": 3,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Cloud Junction 102",
          "concept": "practice congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 53,
      "optimalPushes": 22
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-103-congestion-combine",
        "revision": 3,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "##-----###",
          "#--------#",
          "#-------##",
          "#---.#--##",
          "#-##.--###",
          "#--#.#####",
          "##--.--###",
          "####-----#",
          "##########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 6,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Cloud Junction 103",
          "concept": "combine congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 51,
      "optimalPushes": 23
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-104-congestion-test",
        "revision": 2,
        "width": 10,
        "height": 11,
        "terrain": [
          "##########",
          "##########",
          "#-########",
          "#-#-######",
          "#-----..##",
          "#----..###",
          "###---####",
          "#----#####",
          "##----####",
          "#-------##",
          "##########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 6
          },
          {
            "x": 2,
            "y": 7
          },
          {
            "x": 3,
            "y": 8
          },
          {
            "x": 4,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Cloud Junction 104",
          "concept": "test congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 67,
      "optimalPushes": 28
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-105-congestion-recover",
        "revision": 3,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#.#--#####",
          "#-#---####",
          "#-----####",
          "#--#######",
          "#--------#",
          "##.##-####",
          "#-----####",
          "#.--######",
          "##########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 1,
            "y": 4
          },
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 3,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Cloud Junction 105",
          "concept": "congestion recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 48,
      "optimalPushes": 16
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-106-congestion-teach",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#########-#",
          "########-.#",
          "#####-##--#",
          "####--#---#",
          "####--.---#",
          "####-#-.--#",
          "##-.------#",
          "##--#-----#",
          "###--##---#",
          "###########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 9
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 7
          },
          {
            "x": 7,
            "y": 7
          },
          {
            "x": 3,
            "y": 8
          },
          {
            "x": 7,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Cloud Junction 106",
          "concept": "introduce congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 46,
      "optimalPushes": 20
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-107-congestion-practice",
        "revision": 4,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#####.-###",
          "####-.##-#",
          "####-..--#",
          "####-----#",
          "####-#---#",
          "#-#-#----#",
          "#-#-#----#",
          "#--------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 6,
            "y": 6
          },
          {
            "x": 6,
            "y": 7
          },
          {
            "x": 7,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Cloud Junction 107",
          "concept": "practice congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 61,
      "optimalPushes": 23
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-108-congestion-combine",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "######--###",
          "#######-###",
          "##-####.-##",
          "##-#--#---#",
          "#--.------#",
          "#--------.#",
          "#--##----##",
          "#.##---#--#",
          "###########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 8,
            "y": 4
          },
          {
            "x": 8,
            "y": 5
          },
          {
            "x": 8,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Cloud Junction 108",
          "concept": "combine congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 44,
      "optimalPushes": 24
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-109-congestion-test",
        "revision": 2,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "##.-----..#",
          "##---#----#",
          "##--#-----#",
          "#####--##-#",
          "####--#-#-#",
          "####-##--.#",
          "#######-#-#",
          "########--#",
          "###########"
        ],
        "initialPlayer": {
          "x": 9,
          "y": 8
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 1
          },
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 9,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Cloud Junction 109",
          "concept": "test congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 47,
      "optimalPushes": 26
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-110-congestion-recover",
        "revision": 3,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#-.#######",
          "#--#######",
          "#---######",
          "#--.######",
          "#-----####",
          "#--#---#-#",
          "#-.------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 6
          },
          {
            "x": 5,
            "y": 6
          },
          {
            "x": 6,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Cloud Junction 110",
          "concept": "congestion recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 42,
      "optimalPushes": 15
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-111-congestion-teach",
        "revision": 3,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#-----..##",
          "##----.-##",
          "##----.--#",
          "#---#--###",
          "#------###",
          "###---####",
          "##---#####",
          "##########",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 3,
            "y": 5
          },
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 4,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Cloud Junction 111",
          "concept": "introduce congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 49,
      "optimalPushes": 21
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-112-congestion-practice",
        "revision": 3,
        "width": 10,
        "height": 11,
        "terrain": [
          "##########",
          "###-###--#",
          "##---#-#-#",
          "#--------#",
          "##-------#",
          "#---#-#-##",
          "##.-###--#",
          "##..-#####",
          "###.-#####",
          "##########",
          "##########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 3,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Cloud Junction 112",
          "concept": "practice congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 45,
      "optimalPushes": 23
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-113-congestion-combine",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "####.--.-.#",
          "#####-#---#",
          "#####--.--#",
          "######--#-#",
          "######----#",
          "#####-----#",
          "####----#-#",
          "####--#####",
          "###########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 5
          },
          {
            "x": 6,
            "y": 6
          },
          {
            "x": 7,
            "y": 6
          },
          {
            "x": 8,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Cloud Junction 113",
          "concept": "combine congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 59,
      "optimalPushes": 25
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-114-congestion-test",
        "revision": 2,
        "width": 10,
        "height": 10,
        "terrain": [
          "##########",
          "#####-...#",
          "######--.#",
          "#####----#",
          "###------#",
          "#####----#",
          "######---#",
          "#####----#",
          "###------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 4
          },
          {
            "x": 6,
            "y": 6
          },
          {
            "x": 7,
            "y": 6
          },
          {
            "x": 8,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Cloud Junction 114",
          "concept": "test congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 54,
      "optimalPushes": 27
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-115-congestion-recover",
        "revision": 3,
        "width": 9,
        "height": 9,
        "terrain": [
          "#########",
          "#---#--##",
          "#-----#-#",
          "#-------#",
          "#---#-#-#",
          "#...-##-#",
          "#--#---##",
          "#----####",
          "#########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 6,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Cloud Junction 115",
          "concept": "congestion recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 27,
      "optimalPushes": 15
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-116-congestion-teach",
        "revision": 3,
        "width": 10,
        "height": 11,
        "terrain": [
          "##########",
          "##########",
          "##########",
          "#####-####",
          "##----#..#",
          "#------..#",
          "##-------#",
          "#--------#",
          "##----#--#",
          "#---##---#",
          "##########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 7
          },
          {
            "x": 5,
            "y": 7
          },
          {
            "x": 7,
            "y": 7
          },
          {
            "x": 8,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Cloud Junction 116",
          "concept": "introduce congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 46,
      "optimalPushes": 21
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-117-congestion-practice",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#######-#-#",
          "#######---#",
          "#######--.#",
          "#######-#-#",
          "########--#",
          "#---###---#",
          "#-#-#.----#",
          "##-.----#-#",
          "###-.-----#",
          "###########"
        ],
        "initialPlayer": {
          "x": 9,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 9,
            "y": 2
          },
          {
            "x": 8,
            "y": 6
          },
          {
            "x": 8,
            "y": 7
          },
          {
            "x": 6,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Cloud Junction 117",
          "concept": "practice congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 44,
      "optimalPushes": 24
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-118-congestion-combine",
        "revision": 3,
        "width": 10,
        "height": 11,
        "terrain": [
          "##########",
          "#----....#",
          "#-----#-##",
          "#------###",
          "#-------##",
          "#--#--#--#",
          "#####-####",
          "##########",
          "##########",
          "##########",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 5,
            "y": 3
          },
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 3,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Cloud Junction 118",
          "concept": "combine congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 60,
      "optimalPushes": 26
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-119-congestion-test",
        "revision": 2,
        "width": 10,
        "height": 11,
        "terrain": [
          "##########",
          "##########",
          "####-#####",
          "#...---###",
          "#-#.--#-##",
          "#--#----##",
          "#----#---#",
          "#-----####",
          "#----#-###",
          "#-------##",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 1,
            "y": 7
          },
          {
            "x": 2,
            "y": 7
          },
          {
            "x": 4,
            "y": 7
          },
          {
            "x": 4,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Cloud Junction 119",
          "concept": "test congestion",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 67,
      "optimalPushes": 28
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-120-congestion-recover",
        "revision": 3,
        "width": 10,
        "height": 9,
        "terrain": [
          "##########",
          "#----.#.##",
          "##-------#",
          "#------.##",
          "##--#--###",
          "#-----####",
          "#-###--###",
          "####-----#",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 3
          },
          {
            "x": 3,
            "y": 4
          },
          {
            "x": 5,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Cloud Junction 120",
          "concept": "congestion recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 33,
      "optimalPushes": 16
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-121-counterintuitive-routing-teach",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#####-#####",
          "#####.--###",
          "#######--##",
          "#######--##",
          "###-##-.--#",
          "##--#-#---#",
          "##.---.--.#",
          "##---#----#",
          "##--------#",
          "###########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 3,
            "y": 6
          },
          {
            "x": 4,
            "y": 7
          },
          {
            "x": 2,
            "y": 8
          },
          {
            "x": 4,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Far Orbit 121",
          "concept": "introduce counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 48,
      "optimalPushes": 19
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-122-counterintuitive-routing-practice",
        "revision": 3,
        "width": 10,
        "height": 11,
        "terrain": [
          "##########",
          "#--------#",
          "#-------##",
          "#.-----###",
          "#.---#--##",
          "#.#---#--#",
          "#.#--#---#",
          "#.#-#----#",
          "#--####-##",
          "#######-##",
          "##########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 3,
            "y": 3
          },
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 3,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Far Orbit 122",
          "concept": "practice counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 58,
      "optimalPushes": 25
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-123-counterintuitive-routing-combine",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#----######",
          "##--#######",
          "#-.-#--#-##",
          "#-#-#---.##",
          "#-------..#",
          "##-----####",
          "###-#.--###",
          "###------##",
          "####-##--##",
          "###########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 3,
            "y": 3
          },
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 3,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Far Orbit 123",
          "concept": "combine counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 62,
      "optimalPushes": 26
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-124-counterintuitive-routing-test",
        "revision": 3,
        "width": 10,
        "height": 11,
        "terrain": [
          "##########",
          "#---...--#",
          "##---.#--#",
          "#----.-#-#",
          "#---##--##",
          "#-----#-##",
          "##-----###",
          "###-#-####",
          "###-#--###",
          "##########",
          "##########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 3,
            "y": 3
          },
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 3,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Far Orbit 124",
          "concept": "test counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 68,
      "optimalPushes": 29
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-125-counterintuitive-routing-recover",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "######---##",
          "#######---#",
          "#######.#.#",
          "######----#",
          "#-##------#",
          "#.--------#",
          "##-.----#-#",
          "##----#---#",
          "##---#----#",
          "###########"
        ],
        "initialPlayer": {
          "x": 9,
          "y": 9
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 6
          },
          {
            "x": 5,
            "y": 7
          },
          {
            "x": 4,
            "y": 8
          },
          {
            "x": 9,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Far Orbit 125",
          "concept": "counterintuitive-routing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 31,
      "optimalPushes": 16
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-126-counterintuitive-routing-teach",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "####-######",
          "####---####",
          "###--######",
          "#----##-#-#",
          "##--------#",
          "####---#--#",
          "#------.--#",
          "#-#--...###",
          "###-##.####",
          "###########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 5
          },
          {
            "x": 5,
            "y": 6
          },
          {
            "x": 6,
            "y": 6
          },
          {
            "x": 3,
            "y": 7
          },
          {
            "x": 4,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Far Orbit 126",
          "concept": "introduce counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 44,
      "optimalPushes": 21
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-127-counterintuitive-routing-practice",
        "revision": 3,
        "width": 10,
        "height": 11,
        "terrain": [
          "##########",
          "#.-#######",
          "#..--#####",
          "#.#-######",
          "#.----####",
          "#---#-####",
          "#---#--###",
          "#-----#-##",
          "#---#----#",
          "#---#-#--#",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 2,
            "y": 6
          },
          {
            "x": 2,
            "y": 7
          },
          {
            "x": 3,
            "y": 7
          },
          {
            "x": 1,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Far Orbit 127",
          "concept": "practice counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 60,
      "optimalPushes": 25
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-128-counterintuitive-routing-combine",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "###--.#-###",
          "#---.---.-#",
          "#-#-----###",
          "#-##-.-.--#",
          "###-------#",
          "###-#--#-##",
          "#####--#--#",
          "###########",
          "###########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 3
          },
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 8,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Far Orbit 128",
          "concept": "combine counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 43,
      "optimalPushes": 22
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-129-counterintuitive-routing-test",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#######--##",
          "#####--.-##",
          "##--#--####",
          "#-#---#####",
          "#.#.---####",
          "#--------##",
          "#--------##",
          "##-#.-#-.-#",
          "###########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 2,
            "y": 7
          },
          {
            "x": 4,
            "y": 7
          },
          {
            "x": 5,
            "y": 7
          },
          {
            "x": 7,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Far Orbit 129",
          "concept": "test counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 64,
      "optimalPushes": 25
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-130-counterintuitive-routing-recover",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "###-.--####",
          "####-######",
          "##---######",
          "####--#####",
          "#----.##-##",
          "#--------##",
          "#-----###-#",
          "#-#--.--.-#",
          "###########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 6
          },
          {
            "x": 3,
            "y": 7
          },
          {
            "x": 4,
            "y": 7
          },
          {
            "x": 6,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Far Orbit 130",
          "concept": "counterintuitive-routing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 28,
      "optimalPushes": 16
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-131-counterintuitive-routing-teach",
        "revision": 2,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#---.#-####",
          "#---#--####",
          "#----#--###",
          "#----.--###",
          "#----#-####",
          "#.--#######",
          "#--#-######",
          "##--.######",
          "#.---######",
          "###########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 1,
            "y": 2
          },
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 3,
            "y": 3
          },
          {
            "x": 3,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Far Orbit 131",
          "concept": "introduce counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 40,
      "optimalPushes": 23
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-132-counterintuitive-routing-practice",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#-.--.----#",
          "#-#---#---#",
          "#-#-#--.-##",
          "##----#-###",
          "##-#---####",
          "##-#.-.####",
          "##--#-#####",
          "#-----#####",
          "##-----####",
          "###########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 4,
            "y": 4
          },
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 5,
            "y": 6
          },
          {
            "x": 4,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Far Orbit 132",
          "concept": "practice counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 43,
      "optimalPushes": 24
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-133-counterintuitive-routing-combine",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "######--###",
          "#####---.##",
          "####---####",
          "###--.----#",
          "###--#----#",
          "#-#--#---##",
          "#--.----###",
          "#.##------#",
          "#-.---#-###",
          "###########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 6
          },
          {
            "x": 1,
            "y": 7
          },
          {
            "x": 2,
            "y": 7
          },
          {
            "x": 5,
            "y": 7
          },
          {
            "x": 6,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Far Orbit 133",
          "concept": "combine counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 52,
      "optimalPushes": 25
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-134-counterintuitive-routing-test",
        "revision": 2,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#####---###",
          "#####-#--##",
          "####-#---##",
          "#-##-#----#",
          "#-#--#-#-##",
          "#-#--#----#",
          "#--..---.-#",
          "#-##.---.-#",
          "#-#--#----#",
          "###########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 8,
            "y": 3
          },
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 8,
            "y": 6
          },
          {
            "x": 7,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Far Orbit 134",
          "concept": "test counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 64,
      "optimalPushes": 27
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-135-counterintuitive-routing-recover",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "##--##----#",
          "##----#--##",
          "#-----#-.-#",
          "##------.##",
          "#------####",
          "#--###-####",
          "#-.--#-####",
          "#--########",
          "#.-########",
          "###########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 8,
            "y": 2
          },
          {
            "x": 4,
            "y": 4
          },
          {
            "x": 1,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Far Orbit 135",
          "concept": "counterintuitive-routing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 37,
      "optimalPushes": 15
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-136-counterintuitive-routing-teach",
        "revision": 2,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#########-#",
          "###--#-##-#",
          "#-.----#--#",
          "#-#---#--##",
          "#-.-------#",
          "#-##-.#---#",
          "##-----##.#",
          "##-----#-.#",
          "#####--#--#",
          "###########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 3
          },
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 8,
            "y": 6
          },
          {
            "x": 4,
            "y": 7
          },
          {
            "x": 4,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Far Orbit 136",
          "concept": "introduce counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 58,
      "optimalPushes": 21
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-137-counterintuitive-routing-practice",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "####.-----#",
          "####-#--###",
          "#####.---##",
          "#######-.-#",
          "####------#",
          "####-----.#",
          "####.-----#",
          "####-##--##",
          "######----#",
          "###########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 1
          },
          {
            "x": 5,
            "y": 6
          },
          {
            "x": 6,
            "y": 7
          },
          {
            "x": 7,
            "y": 7
          },
          {
            "x": 8,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Far Orbit 137",
          "concept": "practice counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 54,
      "optimalPushes": 24
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-138-counterintuitive-routing-combine",
        "revision": 2,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#-.--######",
          "##--###.-##",
          "###--##---#",
          "#------.#-#",
          "##----#---#",
          "#.----#--##",
          "#------.--#",
          "###-------#",
          "###########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 1
          },
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 3,
            "y": 6
          },
          {
            "x": 3,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Far Orbit 138",
          "concept": "combine counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 59,
      "optimalPushes": 27
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-139-counterintuitive-routing-test",
        "revision": 2,
        "width": 10,
        "height": 11,
        "terrain": [
          "##########",
          "#----#####",
          "#--#-#####",
          "#---######",
          "#----#####",
          "#-.-#--###",
          "#-..----##",
          "#-..-----#",
          "#---##---#",
          "#------#-#",
          "##########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 6
          },
          {
            "x": 4,
            "y": 7
          },
          {
            "x": 6,
            "y": 7
          },
          {
            "x": 3,
            "y": 8
          },
          {
            "x": 6,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Far Orbit 139",
          "concept": "test counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 64,
      "optimalPushes": 26
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-140-counterintuitive-routing-recover",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#######---#",
          "#######---#",
          "###--#-.--#",
          "##.--#--#.#",
          "##---#----#",
          "##--------#",
          "###------##",
          "###---.#--#",
          "###########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 8
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 6
          },
          {
            "x": 8,
            "y": 6
          },
          {
            "x": 6,
            "y": 7
          },
          {
            "x": 5,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Far Orbit 140",
          "concept": "counterintuitive-routing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 44,
      "optimalPushes": 16
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-141-counterintuitive-routing-teach",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "###-------#",
          "######-##-#",
          "##-#------#",
          "##---##.--#",
          "#####--.#-#",
          "#-#---.---#",
          "#----.---.#",
          "##---#----#",
          "###########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 3
          },
          {
            "x": 4,
            "y": 6
          },
          {
            "x": 5,
            "y": 6
          },
          {
            "x": 6,
            "y": 7
          },
          {
            "x": 8,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Far Orbit 141",
          "concept": "introduce counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 58,
      "optimalPushes": 22
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-142-counterintuitive-routing-practice",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#-------.-#",
          "#..---.-#-#",
          "#---##--###",
          "#-#-#----##",
          "###-###-###",
          "#-----.####",
          "###--######",
          "###---#####",
          "###########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 8
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 1
          },
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 4,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Far Orbit 142",
          "concept": "practice counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 57,
      "optimalPushes": 25
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-143-counterintuitive-routing-combine",
        "revision": 2,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#####.--.-#",
          "#######---#",
          "#####--#--#",
          "#####-----#",
          "####.-----#",
          "#####-----#",
          "####-.#---#",
          "#####.##--#",
          "#####-----#",
          "###########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 8,
            "y": 5
          },
          {
            "x": 7,
            "y": 6
          },
          {
            "x": 8,
            "y": 6
          },
          {
            "x": 8,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Far Orbit 143",
          "concept": "combine counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 63,
      "optimalPushes": 27
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-144-counterintuitive-routing-test",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "##--#######",
          "##--#######",
          "#-#-#######",
          "#-#.#-#####",
          "#--..----##",
          "#--.-----##",
          "#--.#-----#",
          "#-#---##--#",
          "##--#######",
          "###########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 6,
            "y": 6
          },
          {
            "x": 5,
            "y": 7
          },
          {
            "x": 7,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Far Orbit 144",
          "concept": "test counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 64,
      "optimalPushes": 24
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-145-counterintuitive-routing-recover",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "####-.###-#",
          "##-#--##--#",
          "#.--#----##",
          "##.##----##",
          "#--.------#",
          "##---#----#",
          "#-----#-#-#",
          "##---######",
          "#--########",
          "###########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 8,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Far Orbit 145",
          "concept": "counterintuitive-routing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 35,
      "optimalPushes": 15
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-146-counterintuitive-routing-teach",
        "revision": 3,
        "width": 10,
        "height": 11,
        "terrain": [
          "##########",
          "#-####---#",
          "#-##-----#",
          "#-##-#---#",
          "#....----#",
          "#.##-----#",
          "####-#-#-#",
          "####-##--#",
          "####-#---#",
          "######--##",
          "##########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 1,
            "y": 3
          },
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 7,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Far Orbit 146",
          "concept": "introduce counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 58,
      "optimalPushes": 21
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-147-counterintuitive-routing-practice",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#---.-----#",
          "##-------##",
          "#-.#-#--#-#",
          "##.#--#---#",
          "###-.-----#",
          "###-#-#.#-#",
          "#####--##-#",
          "########--#",
          "###########"
        ],
        "initialPlayer": {
          "x": 9,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 8,
            "y": 1
          },
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 7,
            "y": 3
          },
          {
            "x": 8,
            "y": 4
          },
          {
            "x": 6,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Far Orbit 147",
          "concept": "practice counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 52,
      "optimalPushes": 25
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-148-counterintuitive-routing-combine",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "####----###",
          "###---#####",
          "####----###",
          "######.##-#",
          "######-##-#",
          "#----.-#--#",
          "#---------#",
          "##-#----.-#",
          "#.-----.#-#",
          "###########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 6
          },
          {
            "x": 2,
            "y": 7
          },
          {
            "x": 2,
            "y": 8
          },
          {
            "x": 4,
            "y": 8
          },
          {
            "x": 5,
            "y": 9
          }
        ],
        "metadata": {
          "title": "Far Orbit 148",
          "concept": "combine counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 47,
      "optimalPushes": 26
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-149-counterintuitive-routing-test",
        "revision": 3,
        "width": 10,
        "height": 11,
        "terrain": [
          "##########",
          "#---#----#",
          "#-------##",
          "#--##...-#",
          "#-----.--#",
          "#-#-#-.#-#",
          "#-####-#-#",
          "#####---##",
          "######-###",
          "######-###",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 9
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 6,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Far Orbit 149",
          "concept": "test counterintuitive-routing",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 58,
      "optimalPushes": 25
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-150-counterintuitive-routing-recover",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#---#--#--#",
          "#--------.#",
          "#---##-####",
          "##---#.-.-#",
          "#-------###",
          "#-##-##.###",
          "#--#--#-###",
          "#-----#####",
          "#-#########",
          "###########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 3,
            "y": 3
          },
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 7,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Far Orbit 150",
          "concept": "counterintuitive-routing recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 35,
      "optimalPushes": 16
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-151-multi-box-dependency-teach",
        "revision": 2,
        "width": 10,
        "height": 11,
        "terrain": [
          "##########",
          "##--##---#",
          "#--------#",
          "###.##---#",
          "###..----#",
          "##..-----#",
          "####-##--#",
          "###--###-#",
          "#######--#",
          "#######--#",
          "##########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 6,
            "y": 5
          },
          {
            "x": 7,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Linked Observatory 151",
          "concept": "introduce multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 45,
      "optimalPushes": 21
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-152-multi-box-dependency-practice",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "######---##",
          "#####.--#-#",
          "#####-----#",
          "####----.-#",
          "####------#",
          "#####-----#",
          "####-##---#",
          "##-.------#",
          "#--.-#.---#",
          "###########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 9
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 6
          },
          {
            "x": 4,
            "y": 8
          },
          {
            "x": 8,
            "y": 8
          },
          {
            "x": 2,
            "y": 9
          },
          {
            "x": 7,
            "y": 9
          }
        ],
        "metadata": {
          "title": "Linked Observatory 152",
          "concept": "practice multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 44,
      "optimalPushes": 24
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-153-multi-box-dependency-combine",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#-###-#####",
          "#--.#--####",
          "#.--#-#-###",
          "###-#---###",
          "##---.-####",
          "###---#-#-#",
          "#.--------#",
          "#.--#-----#",
          "#------####",
          "###########"
        ],
        "initialPlayer": {
          "x": 9,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 8,
            "y": 7
          },
          {
            "x": 2,
            "y": 8
          },
          {
            "x": 6,
            "y": 8
          },
          {
            "x": 7,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Linked Observatory 153",
          "concept": "combine multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 47,
      "optimalPushes": 25
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-154-multi-box-dependency-test",
        "revision": 3,
        "width": 10,
        "height": 11,
        "terrain": [
          "##########",
          "##---#####",
          "#----#####",
          "#-------##",
          "#-#--#---#",
          "#-....---#",
          "##-.#-####",
          "#----#####",
          "#---######",
          "#-----####",
          "##########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 3,
            "y": 3
          },
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 6,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Linked Observatory 154",
          "concept": "test multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 58,
      "optimalPushes": 23
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-155-multi-box-dependency-recover",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#####-#####",
          "#-##--#####",
          "#-##---#-##",
          "#--##--.-##",
          "##-#--.--.#",
          "#------####",
          "##-----####",
          "##-##--.###",
          "###########"
        ],
        "initialPlayer": {
          "x": 9,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 8,
            "y": 5
          },
          {
            "x": 3,
            "y": 7
          },
          {
            "x": 5,
            "y": 7
          },
          {
            "x": 6,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Linked Observatory 155",
          "concept": "multi-box-dependency recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 38,
      "optimalPushes": 15
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-156-multi-box-dependency-teach",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#---.######",
          "#---#######",
          "#-#---#.-##",
          "##--#---###",
          "#-----..-##",
          "#---#-##-##",
          "#--##--####",
          "##-----####",
          "#.--#---###",
          "###########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 2,
            "y": 6
          },
          {
            "x": 5,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Linked Observatory 156",
          "concept": "introduce multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 57,
      "optimalPushes": 22
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-157-multi-box-dependency-practice",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#----#----#",
          "#-#-.#.---#",
          "###------.#",
          "##------.-#",
          "###---#--##",
          "####-###-##",
          "####-##---#",
          "######--.-#",
          "######----#",
          "###########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 8
        },
        "initialBoxes": [
          {
            "x": 9,
            "y": 2
          },
          {
            "x": 7,
            "y": 3
          },
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 8,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Linked Observatory 157",
          "concept": "practice multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 37,
      "optimalPushes": 21
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-158-multi-box-dependency-combine",
        "revision": 2,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "###########",
          "#--###-####",
          "#-###---###",
          "#--#--#####",
          "#---.####-#",
          "#-.--#.##-#",
          "#------#--#",
          "#---#-----#",
          "#-#-----..#",
          "###########"
        ],
        "initialPlayer": {
          "x": 9,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 9,
            "y": 6
          },
          {
            "x": 5,
            "y": 8
          },
          {
            "x": 6,
            "y": 8
          },
          {
            "x": 8,
            "y": 8
          },
          {
            "x": 7,
            "y": 9
          }
        ],
        "metadata": {
          "title": "Linked Observatory 158",
          "concept": "combine multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 51,
      "optimalPushes": 26
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-159-multi-box-dependency-test",
        "revision": 2,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#####-##-##",
          "####--#--##",
          "#-##-##-.-#",
          "#-#---.#-##",
          "#--#------#",
          "#--####---#",
          "#..-------#",
          "#-#----.#-#",
          "###########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 8,
            "y": 2
          },
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 2,
            "y": 6
          },
          {
            "x": 7,
            "y": 7
          },
          {
            "x": 6,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Linked Observatory 159",
          "concept": "test multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 65,
      "optimalPushes": 28
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-160-multi-box-dependency-recover",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#####--####",
          "######--###",
          "#-####-#--#",
          "#-##.--.--#",
          "#-#-----#.#",
          "#--.#----##",
          "#---#----##",
          "#-#-------#",
          "###########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 7,
            "y": 6
          },
          {
            "x": 2,
            "y": 7
          },
          {
            "x": 6,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Linked Observatory 160",
          "concept": "multi-box-dependency recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 50,
      "optimalPushes": 15
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-161-multi-box-dependency-teach",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "##-#--#####",
          "#-----##.##",
          "#--.####-##",
          "#----###--#",
          "##.--#---##",
          "#-#------##",
          "#-#-#-.-###",
          "#--.---####",
          "###########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 3,
            "y": 6
          },
          {
            "x": 5,
            "y": 6
          },
          {
            "x": 7,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Linked Observatory 161",
          "concept": "introduce multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 57,
      "optimalPushes": 21
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-162-multi-box-dependency-practice",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "###########",
          "#-#########",
          "#-.#-#-####",
          "#.-#.---###",
          "#--#--#--##",
          "#--#-----##",
          "#---.--#--#",
          "#----###.##",
          "#-#----#-##",
          "###########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 9
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 6
          },
          {
            "x": 6,
            "y": 6
          },
          {
            "x": 8,
            "y": 6
          },
          {
            "x": 3,
            "y": 8
          },
          {
            "x": 4,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Linked Observatory 162",
          "concept": "practice multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 53,
      "optimalPushes": 24
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-163-multi-box-dependency-combine",
        "revision": 3,
        "width": 10,
        "height": 11,
        "terrain": [
          "##########",
          "#####-####",
          "#####-####",
          "##----####",
          "#---######",
          "#----...##",
          "#---..#--#",
          "#--------#",
          "##-#-#---#",
          "##-------#",
          "##########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 3,
            "y": 4
          },
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 2,
            "y": 7
          },
          {
            "x": 2,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Linked Observatory 163",
          "concept": "combine multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 59,
      "optimalPushes": 25
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-164-multi-box-dependency-test",
        "revision": 3,
        "width": 10,
        "height": 11,
        "terrain": [
          "##########",
          "##--#--###",
          "##--#---##",
          "##----.###",
          "##----.-##",
          "###-#-..-#",
          "####---.-#",
          "####-----#",
          "######-#-#",
          "#####---##",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 5,
            "y": 2
          },
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 5,
            "y": 3
          },
          {
            "x": 4,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Linked Observatory 164",
          "concept": "test multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 66,
      "optimalPushes": 27
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-165-multi-box-dependency-recover",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#---.-#---#",
          "###--.--.-#",
          "##--------#",
          "#--------##",
          "#---#---###",
          "#---.--####",
          "#---##-####",
          "###########",
          "###########",
          "###########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 3,
            "y": 6
          },
          {
            "x": 5,
            "y": 6
          },
          {
            "x": 6,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Linked Observatory 165",
          "concept": "multi-box-dependency recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 34,
      "optimalPushes": 16
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-166-multi-box-dependency-teach",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "###---#--.#",
          "#####-----#",
          "######-#-##",
          "#####.---##",
          "###.-.----#",
          "####.-----#",
          "###-------#",
          "####-#-#-##",
          "###########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 8,
            "y": 2
          },
          {
            "x": 6,
            "y": 6
          },
          {
            "x": 7,
            "y": 6
          },
          {
            "x": 8,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Linked Observatory 166",
          "concept": "introduce multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 54,
      "optimalPushes": 22
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-167-multi-box-dependency-practice",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#--#-#--###",
          "##-----####",
          "##--##-####",
          "#-----#####",
          "##-#-######",
          "##--.######",
          "#---.-#####",
          "#---..--###",
          "#---.#-####",
          "###########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 3,
            "y": 3
          },
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 2,
            "y": 7
          },
          {
            "x": 3,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Linked Observatory 167",
          "concept": "practice multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 57,
      "optimalPushes": 25
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-168-multi-box-dependency-combine",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "###-###-###",
          "###--##-###",
          "#-##----###",
          "#-----#####",
          "###----####",
          "###----#--#",
          "##----...##",
          "#--#---..##",
          "##-###---##",
          "###########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 4,
            "y": 7
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Linked Observatory 168",
          "concept": "combine multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 64,
      "optimalPushes": 27
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-169-multi-box-dependency-test",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "##------###",
          "####----###",
          "#####----##",
          "####---.#-#",
          "###---.#--#",
          "#####-.-#.#",
          "#-.-------#",
          "##--###---#",
          "###########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 7,
            "y": 3
          },
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 5,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Linked Observatory 169",
          "concept": "test multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 65,
      "optimalPushes": 29
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-170-multi-box-dependency-recover",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "####.-----#",
          "##-#--.---#",
          "##--#-----#",
          "#-#-------#",
          "#------#-##",
          "#---#--####",
          "#-#-##.-###",
          "##-.-######",
          "###########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 4
          },
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 3,
            "y": 5
          },
          {
            "x": 3,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Linked Observatory 170",
          "concept": "multi-box-dependency recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 34,
      "optimalPushes": 16
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-171-multi-box-dependency-teach",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "###.----.-#",
          "####--.#--#",
          "###-------#",
          "####-#--###",
          "#####---.##",
          "#####-.--##",
          "####-----##",
          "###---##-##",
          "###########",
          "###########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 6,
            "y": 5
          },
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 7,
            "y": 6
          },
          {
            "x": 8,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Linked Observatory 171",
          "concept": "introduce multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 57,
      "optimalPushes": 21
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-172-multi-box-dependency-practice",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#####-----#",
          "###--.--.-#",
          "##-------##",
          "##-##--#.-#",
          "#--#---##-#",
          "###--#----#",
          "####-#---##",
          "#####---..#",
          "###########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 8
        },
        "initialBoxes": [
          {
            "x": 8,
            "y": 6
          },
          {
            "x": 6,
            "y": 7
          },
          {
            "x": 7,
            "y": 7
          },
          {
            "x": 8,
            "y": 7
          },
          {
            "x": 6,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Linked Observatory 172",
          "concept": "practice multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 57,
      "optimalPushes": 26
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-173-multi-box-dependency-combine",
        "revision": 3,
        "width": 10,
        "height": 11,
        "terrain": [
          "##########",
          "#-#..--###",
          "#--.--####",
          "#--.#--###",
          "###.-#####",
          "#---#-####",
          "#------###",
          "#----#####",
          "##----####",
          "#--#--####",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 1
          },
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 3,
            "y": 5
          },
          {
            "x": 2,
            "y": 6
          },
          {
            "x": 2,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Linked Observatory 173",
          "concept": "combine multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 59,
      "optimalPushes": 27
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-174-multi-box-dependency-test",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "###-#-#---#",
          "###----#--#",
          "##-##--##-#",
          "##--.-.---#",
          "###--.##--#",
          "#-##---#.-#",
          "#---------#",
          "#####.#---#",
          "########-##",
          "###########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 4
          },
          {
            "x": 8,
            "y": 4
          },
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 5,
            "y": 6
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Linked Observatory 174",
          "concept": "test multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 55,
      "optimalPushes": 24
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-175-multi-box-dependency-recover",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#----.#--##",
          "#-##.#.--##",
          "##--------#",
          "##---#--###",
          "#.----#####",
          "#-----#####",
          "#----######",
          "##-########",
          "###########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 1
          },
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 2,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Linked Observatory 175",
          "concept": "multi-box-dependency recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 38,
      "optimalPushes": 16
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-176-multi-box-dependency-teach",
        "revision": 3,
        "width": 10,
        "height": 11,
        "terrain": [
          "##########",
          "###-######",
          "###-######",
          "#------###",
          "#------###",
          "#---..####",
          "#----..###",
          "#---#.####",
          "#----#--##",
          "#--#-----#",
          "##########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 8
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 4
          },
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 3,
            "y": 6
          },
          {
            "x": 2,
            "y": 7
          },
          {
            "x": 3,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Linked Observatory 176",
          "concept": "introduce multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 56,
      "optimalPushes": 21
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-177-multi-box-dependency-practice",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "####.-#-###",
          "####-#--###",
          "###---#-###",
          "##---#..-##",
          "###--#---##",
          "##.-----#-#",
          "##--------#",
          "##---.#--##",
          "###########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 8
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 4
          },
          {
            "x": 3,
            "y": 6
          },
          {
            "x": 2,
            "y": 7
          },
          {
            "x": 4,
            "y": 7
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Linked Observatory 177",
          "concept": "practice multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 49,
      "optimalPushes": 25
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-178-multi-box-dependency-combine",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#---..----#",
          "##-#..--#-#",
          "#-#-.--#--#",
          "#----#-####",
          "##-#---####",
          "#--------##",
          "####--#-###",
          "####-##--##",
          "####-##--##",
          "###########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 5,
            "y": 3
          },
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 6,
            "y": 5
          },
          {
            "x": 7,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Linked Observatory 178",
          "concept": "combine multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 67,
      "optimalPushes": 28
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-179-multi-box-dependency-test",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "########--#",
          "########-.#",
          "######-#.-#",
          "#####-.---#",
          "####-##---#",
          "###.---.--#",
          "#-###-----#",
          "#-#---#---#",
          "#---------#",
          "###########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 9,
            "y": 5
          },
          {
            "x": 4,
            "y": 6
          },
          {
            "x": 7,
            "y": 7
          },
          {
            "x": 8,
            "y": 7
          },
          {
            "x": 5,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Linked Observatory 179",
          "concept": "test multi-box-dependency",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 55,
      "optimalPushes": 28
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-180-multi-box-dependency-recover",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "##---#.--##",
          "###-------#",
          "##---.----#",
          "#-.--#-####",
          "#-#.-######",
          "#-----#####",
          "#------####",
          "#------####",
          "###########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 3,
            "y": 6
          },
          {
            "x": 3,
            "y": 7
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Linked Observatory 180",
          "concept": "multi-box-dependency recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 37,
      "optimalPushes": 15
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-181-mixed-mastery-teach",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#-------.-#",
          "###---#---#",
          "##-..#----#",
          "###-#---.-#",
          "#####-.---#",
          "######----#",
          "######-#-##",
          "###########",
          "###########",
          "###########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 1
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 1
          },
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 8,
            "y": 2
          },
          {
            "x": 8,
            "y": 3
          }
        ],
        "metadata": {
          "title": "Grand Constellation 181",
          "concept": "introduce mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 43,
      "optimalPushes": 22
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-182-mixed-mastery-practice",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#####.-####",
          "#####---#-#",
          "####--#--.#",
          "#####---#-#",
          "####-#----#",
          "##--.-----#",
          "###-----#-#",
          "######--.-#",
          "######.---#",
          "###########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 8,
            "y": 3
          },
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 7,
            "y": 6
          },
          {
            "x": 9,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Grand Constellation 182",
          "concept": "practice mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 53,
      "optimalPushes": 25
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-183-mixed-mastery-combine",
        "revision": 3,
        "width": 10,
        "height": 11,
        "terrain": [
          "##########",
          "#--##--.##",
          "#----....#",
          "#-----####",
          "##------##",
          "###---####",
          "#---######",
          "##----####",
          "##------##",
          "######--##",
          "##########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 1
          },
          {
            "x": 4,
            "y": 2
          },
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 3,
            "y": 6
          },
          {
            "x": 3,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Grand Constellation 183",
          "concept": "combine mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 61,
      "optimalPushes": 27
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-184-mixed-mastery-test",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "####-######",
          "##---.#####",
          "##--##-####",
          "#-.-#----##",
          "#-----.-#-#",
          "##--------#",
          "#-.#-#----#",
          "###--.#-###",
          "###########"
        ],
        "initialPlayer": {
          "x": 3,
          "y": 8
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 5
          },
          {
            "x": 5,
            "y": 6
          },
          {
            "x": 8,
            "y": 6
          },
          {
            "x": 4,
            "y": 7
          },
          {
            "x": 4,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Grand Constellation 184",
          "concept": "test mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 69,
      "optimalPushes": 30
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-185-mixed-mastery-recover",
        "revision": 3,
        "width": 10,
        "height": 11,
        "terrain": [
          "##########",
          "##.##--###",
          "#-.##---##",
          "##..--####",
          "#--------#",
          "#----#-#-#",
          "#----#####",
          "#--#--####",
          "#---######",
          "#-#--#####",
          "##########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 2,
            "y": 5
          },
          {
            "x": 3,
            "y": 6
          },
          {
            "x": 2,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Grand Constellation 185",
          "concept": "mixed-mastery recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 42,
      "optimalPushes": 16
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-186-mixed-mastery-teach",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "####---##.#",
          "######----#",
          "#-###---#-#",
          "#-#.-.----#",
          "#----.#---#",
          "##-----#--#",
          "###.#--#-##",
          "########--#",
          "###########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 8
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 4,
            "y": 5
          },
          {
            "x": 3,
            "y": 6
          },
          {
            "x": 8,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Grand Constellation 186",
          "concept": "introduce mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 50,
      "optimalPushes": 22
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-187-mixed-mastery-practice",
        "revision": 4,
        "width": 10,
        "height": 11,
        "terrain": [
          "##########",
          "#.#------#",
          "#..--#-###",
          "#..---####",
          "##--#-####",
          "#----#####",
          "##------##",
          "#---#-####",
          "#---######",
          "#-#-######",
          "##########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 6
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 3,
            "y": 4
          },
          {
            "x": 2,
            "y": 6
          },
          {
            "x": 4,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Grand Constellation 187",
          "concept": "practice mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 62,
      "optimalPushes": 24
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-188-mixed-mastery-combine",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#-.-..--.-#",
          "#----.----#",
          "#-----#--##",
          "##------###",
          "#---#--####",
          "#--###--###",
          "#-####-####",
          "#-####--###",
          "###########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 8
        },
        "initialBoxes": [
          {
            "x": 3,
            "y": 1
          },
          {
            "x": 3,
            "y": 2
          },
          {
            "x": 2,
            "y": 3
          },
          {
            "x": 3,
            "y": 4
          },
          {
            "x": 6,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Grand Constellation 188",
          "concept": "combine mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 56,
      "optimalPushes": 26
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-189-mixed-mastery-test",
        "revision": 2,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "######---##",
          "#######-.##",
          "#####---.-#",
          "####----..#",
          "####----#.#",
          "###-#-#--##",
          "###-#-#---#",
          "##---#---##",
          "###----#--#",
          "###########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 5
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 6,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Grand Constellation 189",
          "concept": "test mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 72,
      "optimalPushes": 32
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-190-mixed-mastery-recover",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "##--#######",
          "##--#######",
          "###--######",
          "###-.###-##",
          "##-.--#-.-#",
          "####--.#--#",
          "###--#---##",
          "####------#",
          "####-##---#",
          "###########"
        ],
        "initialPlayer": {
          "x": 4,
          "y": 9
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 6
          },
          {
            "x": 8,
            "y": 7
          },
          {
            "x": 4,
            "y": 8
          },
          {
            "x": 5,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Grand Constellation 190",
          "concept": "mixed-mastery recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 40,
      "optimalPushes": 16
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-191-mixed-mastery-teach",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#####----##",
          "#####-##-##",
          "####-.#-#-#",
          "##-...----#",
          "#--#.-----#",
          "#-#-----###",
          "#-#----####",
          "#-####-####",
          "######---##",
          "###########"
        ],
        "initialPlayer": {
          "x": 6,
          "y": 9
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 4
          },
          {
            "x": 6,
            "y": 5
          },
          {
            "x": 4,
            "y": 6
          },
          {
            "x": 5,
            "y": 6
          },
          {
            "x": 6,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Grand Constellation 191",
          "concept": "introduce mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 37,
      "optimalPushes": 19
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-192-mixed-mastery-practice",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "###########",
          "##-########",
          "##--#--####",
          "#--#---####",
          "#-#----####",
          "#------#--#",
          "#.-#----#-#",
          "#....--#--#",
          "###-#-----#",
          "###########"
        ],
        "initialPlayer": {
          "x": 1,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 1,
            "y": 5
          },
          {
            "x": 5,
            "y": 5
          },
          {
            "x": 2,
            "y": 6
          },
          {
            "x": 5,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Grand Constellation 192",
          "concept": "practice mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 54,
      "optimalPushes": 24
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-193-mixed-mastery-combine",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "####------#",
          "###.------#",
          "#####-----#",
          "###----#--#",
          "###-.-..###",
          "##---##---#",
          "##-#-#--#-#",
          "##-##.---##",
          "#######--##",
          "###########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 8
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 5,
            "y": 3
          },
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 8,
            "y": 3
          },
          {
            "x": 7,
            "y": 8
          }
        ],
        "metadata": {
          "title": "Grand Constellation 193",
          "concept": "combine mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 60,
      "optimalPushes": 22
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-194-mixed-mastery-test",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "###----.###",
          "###--.---##",
          "#------#.-#",
          "#-----#---#",
          "##-#.--#--#",
          "#--##.##--#",
          "##-##--#--#",
          "###---#####",
          "####-######",
          "###########"
        ],
        "initialPlayer": {
          "x": 2,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 5,
            "y": 3
          },
          {
            "x": 3,
            "y": 4
          },
          {
            "x": 4,
            "y": 4
          },
          {
            "x": 2,
            "y": 6
          },
          {
            "x": 8,
            "y": 6
          }
        ],
        "metadata": {
          "title": "Grand Constellation 194",
          "concept": "test mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 63,
      "optimalPushes": 27
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-195-mixed-mastery-recover",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "#-#########",
          "#-##---####",
          "#--#.---.##",
          "#---##---##",
          "#-.----####",
          "#-#----#-##",
          "#-----.---#",
          "#-------###",
          "###########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 7
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 2,
            "y": 7
          },
          {
            "x": 4,
            "y": 7
          },
          {
            "x": 7,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Grand Constellation 195",
          "concept": "mixed-mastery recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 51,
      "optimalPushes": 17
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-196-mixed-mastery-teach",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "###-------#",
          "####------#",
          "###.-.----#",
          "####----#-#",
          "##.-------#",
          "#-#--##.###",
          "#--.##--###",
          "#---##--###",
          "###########"
        ],
        "initialPlayer": {
          "x": 7,
          "y": 8
        },
        "initialBoxes": [
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 8,
            "y": 2
          },
          {
            "x": 7,
            "y": 3
          },
          {
            "x": 3,
            "y": 6
          },
          {
            "x": 7,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Grand Constellation 196",
          "concept": "introduce mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 42,
      "optimalPushes": 22
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-197-mixed-mastery-practice",
        "revision": 3,
        "width": 10,
        "height": 11,
        "terrain": [
          "##########",
          "#-------##",
          "#...---###",
          "#-..----##",
          "#-#-#----#",
          "#-----##-#",
          "#---#--###",
          "##-#######",
          "##-#######",
          "##########",
          "##########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 4
        },
        "initialBoxes": [
          {
            "x": 6,
            "y": 2
          },
          {
            "x": 6,
            "y": 3
          },
          {
            "x": 5,
            "y": 4
          },
          {
            "x": 7,
            "y": 4
          },
          {
            "x": 3,
            "y": 5
          }
        ],
        "metadata": {
          "title": "Grand Constellation 197",
          "concept": "practice mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 62,
      "optimalPushes": 24
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-198-mixed-mastery-combine",
        "revision": 3,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#---#-##--#",
          "#--.-----##",
          "#------#--#",
          "#-#---.-###",
          "#.--##-####",
          "#-#-#######",
          "#--.#######",
          "#-#-#######",
          "#.#--######",
          "###########"
        ],
        "initialPlayer": {
          "x": 8,
          "y": 2
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 2
          },
          {
            "x": 7,
            "y": 2
          },
          {
            "x": 3,
            "y": 3
          },
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 5,
            "y": 4
          }
        ],
        "metadata": {
          "title": "Grand Constellation 198",
          "concept": "combine mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 53,
      "optimalPushes": 26
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-199-mixed-mastery-test",
        "revision": 2,
        "width": 11,
        "height": 11,
        "terrain": [
          "###########",
          "#----######",
          "#-----#####",
          "#--.-######",
          "#--.--.####",
          "#---#######",
          "#-#----####",
          "#------####",
          "#-.--######",
          "#--.--#####",
          "###########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 9
        },
        "initialBoxes": [
          {
            "x": 2,
            "y": 7
          },
          {
            "x": 4,
            "y": 7
          },
          {
            "x": 5,
            "y": 7
          },
          {
            "x": 3,
            "y": 8
          },
          {
            "x": 4,
            "y": 9
          }
        ],
        "metadata": {
          "title": "Grand Constellation 199",
          "concept": "test mixed-mastery",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 65,
      "optimalPushes": 25
    },
    {
      "level": {
        "schema": "g-sokoban/level",
        "version": 1,
        "ruleset": "sokoban/v1",
        "id": "sky-200-mixed-mastery-recover",
        "revision": 3,
        "width": 11,
        "height": 10,
        "terrain": [
          "###########",
          "###########",
          "###-#-#####",
          "##---.##-##",
          "#----#-#-##",
          "#----#----#",
          "#----..-.##",
          "#---------#",
          "#--------##",
          "###########"
        ],
        "initialPlayer": {
          "x": 5,
          "y": 3
        },
        "initialBoxes": [
          {
            "x": 4,
            "y": 3
          },
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 2,
            "y": 7
          },
          {
            "x": 5,
            "y": 7
          }
        ],
        "metadata": {
          "title": "Grand Constellation 200",
          "concept": "mixed-mastery recovery route",
          "author": "G Sokoban",
          "provenance": "original"
        }
      },
      "optimalMoves": 37,
      "optimalPushes": 17
    }
  ]
}
`,ia=Object.assign({"../../levels/campaign/sky-01-first-light.level.json":Xe,"../../levels/campaign/sky-02-step-around.level.json":Ze,"../../levels/campaign/sky-03-turning-lane.level.json":Qe,"../../levels/campaign/sky-04-entry-test.level.json":$e,"../../levels/campaign/sky-05-clear-sky.level.json":et,"../../levels/campaign/sky-06-corner-warning.level.json":tt,"../../levels/campaign/sky-07-back-route.level.json":nt,"../../levels/campaign/sky-08-safe-approach.level.json":rt,"../../levels/campaign/sky-09-wall-orbit.level.json":it,"../../levels/campaign/sky-10-soft-landing.level.json":at,"../../levels/campaign/sky-100-congestion-recover.level.json":ot,"../../levels/campaign/sky-101-congestion-teach.level.json":st,"../../levels/campaign/sky-102-congestion-practice.level.json":V,"../../levels/campaign/sky-103-congestion-combine.level.json":ct,"../../levels/campaign/sky-104-congestion-test.level.json":lt,"../../levels/campaign/sky-105-congestion-recover.level.json":ut,"../../levels/campaign/sky-106-congestion-teach.level.json":H,"../../levels/campaign/sky-107-congestion-practice.level.json":dt,"../../levels/campaign/sky-108-congestion-combine.level.json":ft,"../../levels/campaign/sky-109-congestion-test.level.json":pt,"../../levels/campaign/sky-11-two-stars.level.json":mt,"../../levels/campaign/sky-110-congestion-recover.level.json":ht,"../../levels/campaign/sky-111-congestion-teach.level.json":gt,"../../levels/campaign/sky-112-congestion-practice.level.json":_t,"../../levels/campaign/sky-113-congestion-combine.level.json":vt,"../../levels/campaign/sky-114-congestion-test.level.json":yt,"../../levels/campaign/sky-115-congestion-recover.level.json":bt,"../../levels/campaign/sky-116-congestion-teach.level.json":xt,"../../levels/campaign/sky-117-congestion-practice.level.json":St,"../../levels/campaign/sky-118-congestion-combine.level.json":Ct,"../../levels/campaign/sky-119-congestion-test.level.json":wt,"../../levels/campaign/sky-12-shift-change.level.json":Tt,"../../levels/campaign/sky-120-congestion-recover.level.json":Et,"../../levels/campaign/sky-121-counterintuitive-routing-teach.level.json":Dt,"../../levels/campaign/sky-122-counterintuitive-routing-practice.level.json":Ot,"../../levels/campaign/sky-123-counterintuitive-routing-combine.level.json":kt,"../../levels/campaign/sky-124-counterintuitive-routing-test.level.json":At,"../../levels/campaign/sky-125-counterintuitive-routing-recover.level.json":jt,"../../levels/campaign/sky-126-counterintuitive-routing-teach.level.json":Mt,"../../levels/campaign/sky-127-counterintuitive-routing-practice.level.json":Nt,"../../levels/campaign/sky-128-counterintuitive-routing-combine.level.json":Pt,"../../levels/campaign/sky-129-counterintuitive-routing-test.level.json":Ft,"../../levels/campaign/sky-13-order-lanes.level.json":It,"../../levels/campaign/sky-130-counterintuitive-routing-recover.level.json":Lt,"../../levels/campaign/sky-131-counterintuitive-routing-teach.level.json":Rt,"../../levels/campaign/sky-132-counterintuitive-routing-practice.level.json":zt,"../../levels/campaign/sky-133-counterintuitive-routing-combine.level.json":Bt,"../../levels/campaign/sky-134-counterintuitive-routing-test.level.json":Vt,"../../levels/campaign/sky-135-counterintuitive-routing-recover.level.json":Ht,"../../levels/campaign/sky-136-counterintuitive-routing-teach.level.json":Ut,"../../levels/campaign/sky-137-counterintuitive-routing-practice.level.json":Wt,"../../levels/campaign/sky-138-counterintuitive-routing-combine.level.json":Gt,"../../levels/campaign/sky-139-counterintuitive-routing-test.level.json":Kt,"../../levels/campaign/sky-14-relay-test.level.json":qt,"../../levels/campaign/sky-140-counterintuitive-routing-recover.level.json":Jt,"../../levels/campaign/sky-141-counterintuitive-routing-teach.level.json":Yt,"../../levels/campaign/sky-142-counterintuitive-routing-practice.level.json":Xt,"../../levels/campaign/sky-143-counterintuitive-routing-combine.level.json":Zt,"../../levels/campaign/sky-144-counterintuitive-routing-test.level.json":Qt,"../../levels/campaign/sky-145-counterintuitive-routing-recover.level.json":$t,"../../levels/campaign/sky-146-counterintuitive-routing-teach.level.json":en,"../../levels/campaign/sky-147-counterintuitive-routing-practice.level.json":tn,"../../levels/campaign/sky-148-counterintuitive-routing-combine.level.json":nn,"../../levels/campaign/sky-149-counterintuitive-routing-test.level.json":rn,"../../levels/campaign/sky-15-twin-rest.level.json":an,"../../levels/campaign/sky-150-counterintuitive-routing-recover.level.json":on,"../../levels/campaign/sky-151-multi-box-dependency-teach.level.json":sn,"../../levels/campaign/sky-152-multi-box-dependency-practice.level.json":cn,"../../levels/campaign/sky-153-multi-box-dependency-combine.level.json":ln,"../../levels/campaign/sky-154-multi-box-dependency-test.level.json":un,"../../levels/campaign/sky-155-multi-box-dependency-recover.level.json":dn,"../../levels/campaign/sky-156-multi-box-dependency-teach.level.json":fn,"../../levels/campaign/sky-157-multi-box-dependency-practice.level.json":pn,"../../levels/campaign/sky-158-multi-box-dependency-combine.level.json":mn,"../../levels/campaign/sky-159-multi-box-dependency-test.level.json":hn,"../../levels/campaign/sky-16-step-away.level.json":gn,"../../levels/campaign/sky-160-multi-box-dependency-recover.level.json":_n,"../../levels/campaign/sky-161-multi-box-dependency-teach.level.json":vn,"../../levels/campaign/sky-162-multi-box-dependency-practice.level.json":yn,"../../levels/campaign/sky-163-multi-box-dependency-combine.level.json":bn,"../../levels/campaign/sky-164-multi-box-dependency-test.level.json":xn,"../../levels/campaign/sky-165-multi-box-dependency-recover.level.json":Sn,"../../levels/campaign/sky-166-multi-box-dependency-teach.level.json":Cn,"../../levels/campaign/sky-167-multi-box-dependency-practice.level.json":wn,"../../levels/campaign/sky-168-multi-box-dependency-combine.level.json":Tn,"../../levels/campaign/sky-169-multi-box-dependency-test.level.json":En,"../../levels/campaign/sky-17-long-arc.level.json":Dn,"../../levels/campaign/sky-170-multi-box-dependency-recover.level.json":On,"../../levels/campaign/sky-171-multi-box-dependency-teach.level.json":kn,"../../levels/campaign/sky-172-multi-box-dependency-practice.level.json":An,"../../levels/campaign/sky-173-multi-box-dependency-combine.level.json":jn,"../../levels/campaign/sky-174-multi-box-dependency-test.level.json":Mn,"../../levels/campaign/sky-175-multi-box-dependency-recover.level.json":Nn,"../../levels/campaign/sky-176-multi-box-dependency-teach.level.json":Pn,"../../levels/campaign/sky-177-multi-box-dependency-practice.level.json":Fn,"../../levels/campaign/sky-178-multi-box-dependency-combine.level.json":In,"../../levels/campaign/sky-179-multi-box-dependency-test.level.json":Ln,"../../levels/campaign/sky-18-cross-current.level.json":Rn,"../../levels/campaign/sky-180-multi-box-dependency-recover.level.json":zn,"../../levels/campaign/sky-181-mixed-mastery-teach.level.json":Bn,"../../levels/campaign/sky-182-mixed-mastery-practice.level.json":Vn,"../../levels/campaign/sky-183-mixed-mastery-combine.level.json":Hn,"../../levels/campaign/sky-184-mixed-mastery-test.level.json":Un,"../../levels/campaign/sky-185-mixed-mastery-recover.level.json":Wn,"../../levels/campaign/sky-186-mixed-mastery-teach.level.json":Gn,"../../levels/campaign/sky-187-mixed-mastery-practice.level.json":Kn,"../../levels/campaign/sky-188-mixed-mastery-combine.level.json":qn,"../../levels/campaign/sky-189-mixed-mastery-test.level.json":Jn,"../../levels/campaign/sky-19-retrograde.level.json":Yn,"../../levels/campaign/sky-190-mixed-mastery-recover.level.json":Xn,"../../levels/campaign/sky-191-mixed-mastery-teach.level.json":Zn,"../../levels/campaign/sky-192-mixed-mastery-practice.level.json":Qn,"../../levels/campaign/sky-193-mixed-mastery-combine.level.json":$n,"../../levels/campaign/sky-194-mixed-mastery-test.level.json":er,"../../levels/campaign/sky-195-mixed-mastery-recover.level.json":tr,"../../levels/campaign/sky-196-mixed-mastery-teach.level.json":nr,"../../levels/campaign/sky-197-mixed-mastery-practice.level.json":rr,"../../levels/campaign/sky-198-mixed-mastery-combine.level.json":ir,"../../levels/campaign/sky-199-mixed-mastery-test.level.json":ar,"../../levels/campaign/sky-20-homeward.level.json":or,"../../levels/campaign/sky-200-mixed-mastery-recover.level.json":sr,"../../levels/campaign/sky-21-shared-lane.level.json":cr,"../../levels/campaign/sky-22-traffic-flow.level.json":lr,"../../levels/campaign/sky-23-switchyard.level.json":ur,"../../levels/campaign/sky-24-busy-orbit.level.json":dr,"../../levels/campaign/sky-25-open-channel.level.json":fr,"../../levels/campaign/sky-26-linked-stars.level.json":pr,"../../levels/campaign/sky-27-dependency-chain.level.json":mr,"../../levels/campaign/sky-28-night-shift.level.json":hr,"../../levels/campaign/sky-29-grand-observatory.level.json":gr,"../../levels/campaign/sky-30-dawn-return.level.json":_r,"../../levels/campaign/sky-31-sequencing-teach.level.json":vr,"../../levels/campaign/sky-32-sequencing-practice.level.json":yr,"../../levels/campaign/sky-33-sequencing-combine.level.json":br,"../../levels/campaign/sky-34-sequencing-test.level.json":xr,"../../levels/campaign/sky-35-sequencing-recover.level.json":Sr,"../../levels/campaign/sky-36-sequencing-teach.level.json":Cr,"../../levels/campaign/sky-37-sequencing-practice.level.json":wr,"../../levels/campaign/sky-38-sequencing-combine.level.json":Tr,"../../levels/campaign/sky-39-sequencing-test.level.json":Er,"../../levels/campaign/sky-40-sequencing-recover.level.json":Dr,"../../levels/campaign/sky-41-sequencing-teach.level.json":Or,"../../levels/campaign/sky-42-sequencing-practice.level.json":kr,"../../levels/campaign/sky-43-sequencing-combine.level.json":Ar,"../../levels/campaign/sky-44-sequencing-test.level.json":jr,"../../levels/campaign/sky-45-sequencing-recover.level.json":Mr,"../../levels/campaign/sky-46-sequencing-teach.level.json":Nr,"../../levels/campaign/sky-47-sequencing-practice.level.json":Pr,"../../levels/campaign/sky-48-sequencing-combine.level.json":Fr,"../../levels/campaign/sky-49-sequencing-test.level.json":Ir,"../../levels/campaign/sky-50-sequencing-recover.level.json":Lr,"../../levels/campaign/sky-51-sequencing-teach.level.json":Rr,"../../levels/campaign/sky-52-sequencing-practice.level.json":zr,"../../levels/campaign/sky-53-sequencing-combine.level.json":Br,"../../levels/campaign/sky-54-sequencing-test.level.json":Vr,"../../levels/campaign/sky-55-sequencing-recover.level.json":Hr,"../../levels/campaign/sky-56-sequencing-teach.level.json":Ur,"../../levels/campaign/sky-57-sequencing-practice.level.json":Wr,"../../levels/campaign/sky-58-sequencing-combine.level.json":Gr,"../../levels/campaign/sky-59-sequencing-test.level.json":Kr,"../../levels/campaign/sky-60-sequencing-recover.level.json":qr,"../../levels/campaign/sky-61-staging-order-teach.level.json":Jr,"../../levels/campaign/sky-62-staging-order-practice.level.json":Yr,"../../levels/campaign/sky-63-staging-order-combine.level.json":Xr,"../../levels/campaign/sky-64-staging-order-test.level.json":Zr,"../../levels/campaign/sky-65-staging-order-recover.level.json":Qr,"../../levels/campaign/sky-66-staging-order-teach.level.json":$r,"../../levels/campaign/sky-67-staging-order-practice.level.json":ei,"../../levels/campaign/sky-68-staging-order-combine.level.json":ti,"../../levels/campaign/sky-69-staging-order-test.level.json":ni,"../../levels/campaign/sky-70-staging-order-recover.level.json":ri,"../../levels/campaign/sky-71-staging-order-teach.level.json":ii,"../../levels/campaign/sky-72-staging-order-practice.level.json":ai,"../../levels/campaign/sky-73-staging-order-combine.level.json":oi,"../../levels/campaign/sky-74-staging-order-test.level.json":si,"../../levels/campaign/sky-75-staging-order-recover.level.json":ci,"../../levels/campaign/sky-76-staging-order-teach.level.json":li,"../../levels/campaign/sky-77-staging-order-practice.level.json":ui,"../../levels/campaign/sky-78-staging-order-combine.level.json":di,"../../levels/campaign/sky-79-staging-order-test.level.json":fi,"../../levels/campaign/sky-80-staging-order-recover.level.json":pi,"../../levels/campaign/sky-81-staging-order-teach.level.json":mi,"../../levels/campaign/sky-82-staging-order-practice.level.json":hi,"../../levels/campaign/sky-83-staging-order-combine.level.json":gi,"../../levels/campaign/sky-84-staging-order-test.level.json":_i,"../../levels/campaign/sky-85-staging-order-recover.level.json":vi,"../../levels/campaign/sky-86-staging-order-teach.level.json":yi,"../../levels/campaign/sky-87-staging-order-practice.level.json":bi,"../../levels/campaign/sky-88-staging-order-combine.level.json":xi,"../../levels/campaign/sky-89-staging-order-test.level.json":Si,"../../levels/campaign/sky-90-staging-order-recover.level.json":Ci,"../../levels/campaign/sky-91-congestion-teach.level.json":wi,"../../levels/campaign/sky-92-congestion-practice.level.json":Ti,"../../levels/campaign/sky-93-congestion-combine.level.json":Ei,"../../levels/campaign/sky-94-congestion-test.level.json":Di,"../../levels/campaign/sky-95-congestion-recover.level.json":Oi,"../../levels/campaign/sky-96-congestion-teach.level.json":ki,"../../levels/campaign/sky-97-congestion-practice.level.json":Ai,"../../levels/campaign/sky-98-congestion-combine.level.json":ji,"../../levels/campaign/sky-99-congestion-test.level.json":Mi});function aa(e){return Object.fromEntries(Object.entries(e).map(([e,t])=>[e.replace(/^\.\.\/\.\.\//,``),JSON.parse(t)]))}var oa=aa(ia);function sa(e,t){if(t.startsWith(`/`)||t.includes(`..`))throw Error(`Campaign path is not repository-relative: ${t}`);if(!(t in e))throw Error(`Campaign level document is missing: ${t}`);return e[t]}function ca(e,t,n){let r=ea(e),i=qi(t);if(i.entries.length!==r.entries.length)throw Error(`Runtime campaign length does not match the manifest.`);let a=r.entries.map((e,t)=>{let r=t+1,a=i.entries[t];if(e.position!==r||a?.position!==e.position||a.levelId!==e.levelId||a.levelPath!==e.levelPath)throw Error(`Runtime campaign entry ${r} does not match the manifest.`);let o=oe(sa(n,e.levelPath));if(!o.ok)throw Error(`${e.levelId} is invalid: ${JSON.stringify(o.errors)}`);if(o.value.id!==e.levelId)throw Error(`Campaign level ${e.levelId} contains ${o.value.id}.`);return Object.freeze({entry:e,level:o.value})});return Object.freeze({manifest:r,levels:Object.freeze(a),runtime:i})}var U=ca(JSON.parse(ta),JSON.parse(na),oa);function la(e){if(typeof e!=`object`||!e||Array.isArray(e))throw Error(`Legacy campaign must be an object.`);let t=e;if(t.schema!==`g-sokoban/legacy-campaign`||t.version!==1||!Array.isArray(t.levels))throw Error(`Legacy campaign schema is invalid.`);let n=new Set;return Object.freeze(t.levels.map(e=>{if(typeof e!=`object`||!e||Array.isArray(e))throw Error(`Legacy campaign entry must be an object.`);let t=e,r=oe(t.level);if(!r.ok||typeof t.optimalMoves!=`number`||typeof t.optimalPushes!=`number`||!Number.isInteger(t.optimalMoves)||!Number.isInteger(t.optimalPushes)||t.optimalPushes<0||t.optimalMoves<t.optimalPushes)throw Error(`Legacy campaign board or optimal summary is invalid.`);let i=`${r.value.id}:${E(r.value)}`;if(n.has(i))throw Error(`Legacy campaign contains a duplicate board.`);return n.add(i),Object.freeze({level:r.value,optimalMoves:t.optimalMoves,optimalPushes:t.optimalPushes})}))}var ua=la(JSON.parse(ra));function da(e,t){let n=new Map,r=[...e,...t.map(e=>e.level)].toSorted((e,t)=>e.revision-t.revision);for(let e of r){let t=n.get(e.id);if(!t||e.revision<t.revision)n.set(e.id,e);else if(e.revision===t.revision&&E(e)!==E(t))throw Error(`Campaign revision identity is ambiguous for ${e.id}.`)}return Object.freeze(Object.fromEntries([...n].map(([e,t])=>[e,E(t)])))}var fa=da(U.levels.map(({level:e})=>e),ua);function pa(e,t,n=ua,r=!0){if(t.current?.levelId!==e.level.id||t.current.state.levelFingerprint===E(e.level))return e;let i=t.current,a=n.find(({level:t})=>t.id===e.level.id&&E(t)===i.state.levelFingerprint);if(!a)return e;let o=ye(a.level,i.state);return!o.ok||!r&&Bi(a.level,o.value)===`won`?e:a}var ma=Object.freeze(U.levels.slice(0,30).map(({level:e})=>e.id));function ha(e,t){if(!Number.isInteger(t)||t<1||t>e.levels.length)throw RangeError(`Campaign position is outside the bundled campaign.`);let n=e.levels[t-1];if(!n)throw Error(`Campaign selection did not resolve to a level.`);return n}function ga(e,t,n){let r=t.levels.length,i=Math.max(1,Math.min(r,e.campaign.highestUnlocked)),a=e.current?t.levels.findIndex(({level:t})=>t.id===e.current?.levelId)+1:0;return a>=1&&e.current?.mode===`daily`&&e.current.levelId===n?{position:a,mode:`daily`}:a>=1&&a<=i?{position:a,mode:`campaign`}:{position:i,mode:`campaign`}}var _a=Object.freeze({"sky-01-first-light":{title:`First Light`},"sky-02-step-around":{title:`Step Around`},"sky-03-turning-lane":{title:`Turning Lane`},"sky-04-entry-test":{title:`Entry Test`},"sky-05-clear-sky":{title:`Clear Sky`},"sky-06-corner-warning":{title:`Corner Warning`},"sky-07-back-route":{title:`Back Route`},"sky-08-safe-approach":{title:`Safe Approach`},"sky-09-wall-orbit":{title:`Wall Orbit`},"sky-10-soft-landing":{title:`Soft Landing`},"sky-11-two-stars":{title:`Two Stars`},"sky-12-shift-change":{title:`Shift Change`},"sky-13-order-lanes":{title:`Order Lanes`},"sky-14-relay-test":{title:`Relay Test`},"sky-15-twin-rest":{title:`Twin Rest`},"sky-16-step-away":{title:`Step Away`},"sky-17-long-arc":{title:`Long Arc`},"sky-18-cross-current":{title:`Cross Current`},"sky-19-retrograde":{title:`Retrograde`},"sky-20-homeward":{title:`Homeward`},"sky-21-shared-lane":{title:`Shared Lane`},"sky-22-traffic-flow":{title:`Traffic Flow`},"sky-23-switchyard":{title:`Switchyard`},"sky-24-busy-orbit":{title:`Busy Orbit`},"sky-25-open-channel":{title:`Open Channel`},"sky-26-linked-stars":{title:`Linked Stars`},"sky-27-dependency-chain":{title:`Dependency Chain`},"sky-28-night-shift":{title:`Night Shift`},"sky-29-grand-observatory":{title:`Grand Observatory`},"sky-30-dawn-return":{title:`Dawn Return`},"sky-31-sequencing-teach":{title:`Beacon Wakes`},"sky-32-sequencing-practice":{title:`Answering Light`},"sky-33-sequencing-combine":{title:`Signals Cross`},"sky-34-sequencing-test":{title:`Midnight Relay`},"sky-35-sequencing-recover":{title:`Quiet Frequency`},"sky-36-sequencing-teach":{title:`Pulse at Dawn`},"sky-37-sequencing-practice":{title:`Returning Rhythm`},"sky-38-sequencing-combine":{title:`Braided Cadence`},"sky-39-sequencing-test":{title:`Clockwork Sky`},"sky-40-sequencing-recover":{title:`After the Chime`},"sky-41-sequencing-teach":{title:`Comet Call`},"sky-42-sequencing-practice":{title:`Trail of Echoes`},"sky-43-sequencing-combine":{title:`Comet Braid`},"sky-44-sequencing-test":{title:`Meteor Chorus`},"sky-45-sequencing-recover":{title:`Fading Spark`},"sky-46-sequencing-teach":{title:`First Bell`},"sky-47-sequencing-practice":{title:`Turning Hands`},"sky-48-sequencing-combine":{title:`Chimes Aligned`},"sky-49-sequencing-test":{title:`Hour of Sparks`},"sky-50-sequencing-recover":{title:`Silent Starclock`},"sky-51-sequencing-teach":{title:`Lantern Signal`},"sky-52-sequencing-practice":{title:`Distant Reply`},"sky-53-sequencing-combine":{title:`Woven Messages`},"sky-54-sequencing-test":{title:`Static Storm`},"sky-55-sequencing-recover":{title:`Clear Reception`},"sky-56-sequencing-teach":{title:`Starlight Dispatch`},"sky-57-sequencing-practice":{title:`Courier Moon`},"sky-58-sequencing-combine":{title:`Meeting Lines`},"sky-59-sequencing-test":{title:`Last Transmission`},"sky-60-sequencing-recover":{title:`Sleeping Beacon`},"sky-61-staging-order-teach":{title:`Moon Dock Opens`},"sky-62-staging-order-practice":{title:`Cargo Lantern`},"sky-63-staging-order-combine":{title:`Cargo Constellation`},"sky-64-staging-order-test":{title:`Night Departure`},"sky-65-staging-order-recover":{title:`Empty Berth`},"sky-66-staging-order-teach":{title:`Yard Lights`},"sky-67-staging-order-practice":{title:`Rolling Carts`},"sky-68-staging-order-combine":{title:`Lantern Exchange`},"sky-69-staging-order-test":{title:`Whistle in Fog`},"sky-70-staging-order-recover":{title:`Sleeping Siding`},"sky-71-staging-order-teach":{title:`Cloud Depot`},"sky-72-staging-order-practice":{title:`Silver Trolleys`},"sky-73-staging-order-combine":{title:`Shared Platform`},"sky-74-staging-order-test":{title:`Moonrise Rush`},"sky-75-staging-order-recover":{title:`Platform Hush`},"sky-76-staging-order-teach":{title:`Archive Door`},"sky-77-staging-order-practice":{title:`Shelves in Motion`},"sky-78-staging-order-combine":{title:`Star Charts Meet`},"sky-79-staging-order-test":{title:`Curator's Night`},"sky-80-staging-order-recover":{title:`Dustless Morning`},"sky-81-staging-order-teach":{title:`Hangar Lights`},"sky-82-staging-order-practice":{title:`Shuttle Waltz`},"sky-83-staging-order-combine":{title:`Harbor Knot`},"sky-84-staging-order-test":{title:`Siren at Zenith`},"sky-85-staging-order-recover":{title:`Open Hangar`},"sky-86-staging-order-teach":{title:`Dawn Inventory`},"sky-87-staging-order-practice":{title:`Paper Moon`},"sky-88-staging-order-combine":{title:`Ledger Mosaic`},"sky-89-staging-order-test":{title:`Bell Over the Yard`},"sky-90-staging-order-recover":{title:`All Lamps Low`},"sky-91-congestion-teach":{title:`Cloud Junction`},"sky-92-congestion-practice":{title:`Passing Vapors`},"sky-93-congestion-combine":{title:`Braided Skyways`},"sky-94-congestion-test":{title:`Thunder Traffic`},"sky-95-congestion-recover":{title:`Open Air`},"sky-96-congestion-teach":{title:`Orbit Entrance`},"sky-97-congestion-practice":{title:`Circling Lights`},"sky-98-congestion-combine":{title:`Converging Moons`},"sky-99-congestion-test":{title:`Rush Hour Stars`},"sky-100-congestion-recover":{title:`Silent Orbit`},"sky-101-congestion-teach":{title:`Windway Gate`},"sky-102-congestion-practice":{title:`Following Drafts`},"sky-103-congestion-combine":{title:`Crosswind Chorus`},"sky-104-congestion-test":{title:`Crossing Gale`},"sky-105-congestion-recover":{title:`Clearing Clouds`},"sky-106-congestion-teach":{title:`Meteor Harbor`},"sky-107-congestion-practice":{title:`Incoming Glow`},"sky-108-congestion-combine":{title:`Harbor Confluence`},"sky-109-congestion-test":{title:`Shower at Midnight`},"sky-110-congestion-recover":{title:`Clear Anchorage`},"sky-111-congestion-teach":{title:`Sky Market Opens`},"sky-112-congestion-practice":{title:`Lantern Crowd`},"sky-113-congestion-combine":{title:`Aisles Entwine`},"sky-114-congestion-test":{title:`Closing Bell Rush`},"sky-115-congestion-recover":{title:`Empty Arcade`},"sky-116-congestion-teach":{title:`Rainway Sign`},"sky-117-congestion-practice":{title:`Drifting Umbrellas`},"sky-118-congestion-combine":{title:`Rivers Overhead`},"sky-119-congestion-test":{title:`Eye of the Storm`},"sky-120-congestion-recover":{title:`Blue Clearing`},"sky-121-counterintuitive-routing-teach":{title:`Distant Arc`},"sky-122-counterintuitive-routing-practice":{title:`Wandering Moon`},"sky-123-counterintuitive-routing-combine":{title:`Gravity Knot`},"sky-124-counterintuitive-routing-test":{title:`Beyond the Ring`},"sky-125-counterintuitive-routing-recover":{title:`Homeward Glow`},"sky-126-counterintuitive-routing-teach":{title:`Westbound Star`},"sky-127-counterintuitive-routing-practice":{title:`Backward Breeze`},"sky-128-counterintuitive-routing-combine":{title:`Tangled Compass`},"sky-129-counterintuitive-routing-test":{title:`Northless Night`},"sky-130-counterintuitive-routing-recover":{title:`Morning Bearing`},"sky-131-counterintuitive-routing-teach":{title:`Comet Bends`},"sky-132-counterintuitive-routing-practice":{title:`Wandering Tail`},"sky-133-counterintuitive-routing-combine":{title:`Folded Horizon`},"sky-134-counterintuitive-routing-test":{title:`Long Way Around`},"sky-135-counterintuitive-routing-recover":{title:`Near Again`},"sky-136-counterintuitive-routing-teach":{title:`Hidden Sunrise`},"sky-137-counterintuitive-routing-practice":{title:`Shadow Compass`},"sky-138-counterintuitive-routing-combine":{title:`Mirrors of Dusk`},"sky-139-counterintuitive-routing-test":{title:`Eclipse Turn`},"sky-140-counterintuitive-routing-recover":{title:`Familiar East`},"sky-141-counterintuitive-routing-teach":{title:`Falling Upward`},"sky-142-counterintuitive-routing-practice":{title:`Sideways Rain`},"sky-143-counterintuitive-routing-combine":{title:`Curved Gravity`},"sky-144-counterintuitive-routing-test":{title:`Comet at Perilune`},"sky-145-counterintuitive-routing-recover":{title:`Gentle Return`},"sky-146-counterintuitive-routing-teach":{title:`Lost Meridian`},"sky-147-counterintuitive-routing-practice":{title:`Roaming Needle`},"sky-148-counterintuitive-routing-combine":{title:`Compass Chorus`},"sky-149-counterintuitive-routing-test":{title:`Compass in Eclipse`},"sky-150-counterintuitive-routing-recover":{title:`True Horizon`},"sky-151-multi-box-dependency-teach":{title:`Bridge Lantern`},"sky-152-multi-box-dependency-practice":{title:`Shared Footsteps`},"sky-153-multi-box-dependency-combine":{title:`Arches Interlace`},"sky-154-multi-box-dependency-test":{title:`Bridge Under Stars`},"sky-155-multi-box-dependency-recover":{title:`River at Peace`},"sky-156-multi-box-dependency-teach":{title:`Brass Dawn`},"sky-157-multi-box-dependency-practice":{title:`Turning Teeth`},"sky-158-multi-box-dependency-combine":{title:`Interlocked Gears`},"sky-159-multi-box-dependency-test":{title:`Observatory Engine`},"sky-160-multi-box-dependency-recover":{title:`Brass Silence`},"sky-161-multi-box-dependency-teach":{title:`Gravity Well`},"sky-162-multi-box-dependency-practice":{title:`Orbital Companions`},"sky-163-multi-box-dependency-combine":{title:`Tides Entwined`},"sky-164-multi-box-dependency-test":{title:`Celestial Tension`},"sky-165-multi-box-dependency-recover":{title:`Weightless Calm`},"sky-166-multi-box-dependency-teach":{title:`Chainlight`},"sky-167-multi-box-dependency-practice":{title:`Passing Spark`},"sky-168-multi-box-dependency-combine":{title:`Knotted Starlight`},"sky-169-multi-box-dependency-test":{title:`Stellar Current`},"sky-170-multi-box-dependency-recover":{title:`Unbound Glow`},"sky-171-multi-box-dependency-teach":{title:`North Tower`},"sky-172-multi-box-dependency-practice":{title:`Whispering Domes`},"sky-173-multi-box-dependency-combine":{title:`Bridges of Glass`},"sky-174-multi-box-dependency-test":{title:`Midnight Watchers`},"sky-175-multi-box-dependency-recover":{title:`Lights Outward`},"sky-176-multi-box-dependency-teach":{title:`Silver Lattice`},"sky-177-multi-box-dependency-practice":{title:`Traveling Pulse`},"sky-178-multi-box-dependency-combine":{title:`Woven Orbits`},"sky-179-multi-box-dependency-test":{title:`Resonant Sky`},"sky-180-multi-box-dependency-recover":{title:`Soft Release`},"sky-181-mixed-mastery-teach":{title:`Constellation Gate`},"sky-182-mixed-mastery-practice":{title:`Starfield Memory`},"sky-183-mixed-mastery-combine":{title:`Celestial Mosaic`},"sky-184-mixed-mastery-test":{title:`Crown of Night`},"sky-185-mixed-mastery-recover":{title:`Dawn Among Stars`},"sky-186-mixed-mastery-teach":{title:`Zenith Lantern`},"sky-187-mixed-mastery-practice":{title:`Watchtower Echo`},"sky-188-mixed-mastery-combine":{title:`Skyglass Mosaic`},"sky-189-mixed-mastery-test":{title:`Aurora Vigil`},"sky-190-mixed-mastery-recover":{title:`Morning Watch`},"sky-191-mixed-mastery-teach":{title:`Eclipse Gate`},"sky-192-mixed-mastery-practice":{title:`Shadow Passage`},"sky-193-mixed-mastery-combine":{title:`Light and Umbra`},"sky-194-mixed-mastery-test":{title:`Moonless Crown`},"sky-195-mixed-mastery-recover":{title:`Sunlit Passage`},"sky-196-mixed-mastery-teach":{title:`Home Star Rising`},"sky-197-mixed-mastery-practice":{title:`Familiar Signals`},"sky-198-mixed-mastery-combine":{title:`Lights Return Home`},"sky-199-mixed-mastery-test":{title:`Last Night Watch`},"sky-200-mixed-mastery-recover":{title:`Starlight Home`}});function va(e){let t=e.pushes-e.optimalPushes,n=e.moves-e.optimalMoves;return Object.freeze(t<0||t===0&&n<0?{kind:`invalid-benchmark`}:t===0&&n===0?{kind:`matched`}:t===0?{kind:`pushes-matched`,pushes:e.pushes,extraMoves:n}:n<0?{kind:`tradeoff`,extraPushes:t,fewerMoves:-n}:n===0?{kind:`same-moves`,extraPushes:t}:{kind:`benchmark-ahead`,fewerPushes:t,fewerMoves:n})}var ya=new Intl.NumberFormat(`en-US`,{maximumFractionDigits:0}),ba=new Intl.DateTimeFormat(`en-US`,{year:`numeric`,month:`long`,day:`numeric`}),xa=new Intl.PluralRules(`en-US`);function W(e){return ya.format(e)}function G(e,t,n){let r=xa.select(e)===`one`?t:n;return`${W(e)} ${r}`}function Sa(e){let t=va(e);switch(t.kind){case`matched`:return`You matched the minimum-push route.`;case`pushes-matched`:return`You matched the minimum ${G(t.pushes,`push`,`pushes`)} and used ${G(t.extraMoves,`more move`,`more moves`)}.`;case`tradeoff`:return`You used ${G(t.extraPushes,`more push`,`more pushes`)} and ${G(t.fewerMoves,`fewer move`,`fewer moves`)} than the minimum-push route.`;case`same-moves`:return`You used ${G(t.extraPushes,`more push`,`more pushes`)} and the same number of moves as the minimum-push route.`;case`benchmark-ahead`:return`The minimum-push route used ${G(t.fewerPushes,`fewer push`,`fewer pushes`)} and ${G(t.fewerMoves,`fewer move`,`fewer moves`)}.`;case`invalid-benchmark`:return`This result beats the recorded benchmark.`}}var Ca=Object.freeze({bug:`Bug`,difficulty:`Difficulty`,controls:`Controls`,visual:`Visuals`,other:`Other`});function wa(e){let t=`${W(e.filled)}/${W(e.total)}`;switch(e.event){case`level_won`:return`Observation complete. Every starlight crystal is in an observation ring.`;case`box_pushed`:return`Starlight crystal pushed. Goals ${t}.`;case`player_moved`:return`Moved one space. Goals ${t}.`;case`move_blocked`:return`You cannot move in that direction.`;case`move_undone`:return`Previous move undone. Goals ${t}.`;case`undo_unavailable`:return`There is no move to undo.`;case`level_restarted`:return`Observation mission restarted from its initial state.`;case`ready`:return`Goals ${t}.`}}var Ta=Object.freeze({brand:{eyebrow:`STARLIGHT SOKOBAN`,title:`Starlight Sokoban`},levelMenu:{eyebrow:e=>`${W(e)} MISSIONS`,title:`Choose an observation mission`,closeLabel:`Close level selection`,dailyLevel:({position:e,title:t})=>`Daily Puzzle · ${W(e)}. ${t}`,gridLabel:`Campaign levels`,note:`Completing a mission unlocks the next one. The daily puzzle can be played separately from campaign progress.`,choiceLabel:({position:e,title:t,state:n})=>{let r=n===`completed`?`completed`:n===`locked`?`locked`:`open`;return`Level ${W(e)}: ${t}, ${r}`},pageLabel:({first:e,last:t,total:n,page:r,pageCount:i})=>`Levels ${W(e)}–${W(t)} of ${W(n)} · Page ${W(r)} of ${W(i)}`,previousPage:`Previous levels`,nextPage:`Next levels`},mission:{fallbackTitle:`Starlight observation mission`,fallbackSubtitle:`Guide each crystal into an observation ring`,dailyMode:`Daily Puzzle`,campaignMode:({position:e,total:t})=>`Campaign ${W(e)}/${W(t)}`,levelSelectorLabel:({position:e,total:t})=>`Choose a level, currently ${W(e)} of ${W(t)}`,settingsOpenLabel:`Open settings`,settingsName:`Settings`,stateLabel:`Game status`},board:{regionLabel:`Puzzle board`,inputHelp:({showDirectionButtons:e,wideSwipe:t})=>`Move with the arrow keys, W A S D${e?`, direction buttons`:``}, or a swipe ${t?`across the play area`:`on the puzzle board`}.`,summary:({total:e,filled:t})=>`Starlight Sokoban board. ${W(t)} of ${W(e)} crystals are in observation rings.`},stats:{goals:`Goals`,moves:`Moves`,pushes:`Pushes`,goalProgress:({total:e,filled:t})=>`${W(t)}/${W(e)}`},status:{observing:`Observing`,complete:`Observation complete`},navigation:{nextObservation:`Next observation`,backToCampaign:`Back to campaign`,missionList:`Mission list`},actions:{regionLabel:`Puzzle actions`,undo:`Undo`,restart:`Restart`,share:`Share`,shareLabel:`Share result`},movement:{regionLabel:`Directional movement`,up:`Move up`,left:`Move left`,right:`Move right`,down:`Move down`},settings:{eyebrow:`LOCAL SETTINGS`,title:`Observation settings`,closeLabel:`Close settings`,soundTitle:`Sound effects`,soundDescription:`Play a short synthesized sound when you push a crystal.`,hapticsTitle:`Haptics`,hapticsDescription:`Provide light haptic feedback on supported devices.`,reducedMotionTitle:`Reduce motion`,reducedMotionDescription:`Stop cloud and decorative movement.`,directionButtonsTitle:`Show direction buttons`,directionButtonsDescription:`Keep the four-way pad visible. Swipe and keyboard controls still work when hidden.`,wideSwipeTitle:`Swipe across the play area`,wideSwipeDescription:`Allow swipes on the board and its surrounding play area. Buttons and dialogs are excluded.`,languageTitle:`Language`,languageDescription:`Switch between Korean and English immediately.`,korean:`한국어`,english:`English`,privacyLink:`Privacy · local metrics`,feedbackLink:`Feedback note`},privacy:{eyebrow:`PRIVATE BY DEFAULT`,title:`Privacy and local metrics`,closeLabel:`Close privacy information`,localOnlyExplanation:`Game saves and local play metrics stay on this device and are not sent to a server. Only feedback you explicitly consent to and send is stored privately for up to 90 days. We do not ask for contact details or an account.`,retentionExplanation:`Only approved play counts are aggregated by date and level, for up to 30 days and 512 entries.`,localeExplanation:`Language and control preferences are stored separately from game progress on this device. They are not measured, and clearing local metrics keeps these choices.`,copyMetrics:`Copy local metrics`,metricsLabel:`Local metrics`,clearMetrics:`Clear local metrics`,clearedStatus:`Local metrics cleared.`,copiedStatus:`Local metrics copied.`,selectedStatus:`Local metrics selected. Press and hold to copy.`},feedback:{eyebrow:`PRIVATE FEEDBACK`,title:`Feedback note`,closeLabel:`Close feedback note`,explanation:`Send a report to our private Hostinger inbox, or copy a note. Reports are kept for up to 90 days; encrypted Supabase backups may retain them for 7 days longer. To request deletion, choose Other and send your receipt number here. Please leave out names, email addresses, and other personal details. Nothing is sent automatically.`,categoryLabel:`Feedback category`,categories:Ca,memoLabel:`Generated feedback note`,copyMemo:`Copy feedback note`,copiedStatus:`Feedback note copied.`,selectedStatus:`Feedback note selected. Press and hold to copy.`,memo:({category:e,levelId:t})=>`Starlight Sokoban feedback\nCategory: ${Ca[e]}\nLevel: ${t}`,messageLabel:`Your feedback`,messageHelp:`10–2,000 characters after trimming spaces. Drafts stay in memory until this page closes; reopening the dialog keeps them.`,previewLabel:`Report to send`,previewMeta:({category:e,levelId:t,appVersion:n,locale:r})=>`Category: ${e}\nLevel: ${t}\nBuild: ${n}\nLanguage: ${r}`,consent:`I agree to send this report for private storage for up to 90 days.`,send:`Send feedback`,clear:`Clear draft`,copyReport:`Copy report`,sending:`Sending… Please wait.`,received:e=>`Received. Receipt: ${e}`,failed:`Could not confirm delivery. Your draft is kept. Check your connection, then send again or copy the report.`,rateLimited:`Too many reports. Your draft is kept. Wait a few minutes before sending again, or copy it.`,invalid:`Enter 10–2,000 characters and agree to send the report. If rejected again, copy your report.`,conflict:`This request could not be matched. Your draft is kept. Copy it, or edit the report before sending again.`,cleared:`Draft cleared.`},manualShare:{eyebrow:`COPY RESULT`,title:`Copy result manually`,closeLabel:`Close manual copy`,resultLabel:`Result to copy`,selectionHelp:`The full text is selected. Press and hold to copy it.`},result:{dialogLabel:`Observation result`,comparisonLabel:`Completed result comparison`,eyebrow:`MISSION COMPLETE`,title:`Observation complete!`,playerRecord:`Your result`,optimalRecord:`Minimum-push route`,moves:`Moves`,pushes:`Pushes`,optimalRule:`Fewest pushes; among those routes, fewest moves.`,viewBoard:`View board`,completionMessage:Sa,summary:({moves:e,pushes:t})=>`${G(e,`move`,`moves`)} · ${G(t,`push`,`pushes`)}`},announcements:{event:wa},share:{title:`Starlight Sokoban`,text:({date:e,moves:t,pushes:n,solved:r})=>{let i=r?`✦ Observation complete`:`◇ Observing`;return[`Starlight Sokoban ${e}`,`${i} · ${G(t,`move`,`moves`)} · ${G(n,`push`,`pushes`)}`,`#GSokoban`].join(`
`)},sharedStatus:`Result shared.`,copiedStatus:`Result copied.`,cancelledStatus:`Sharing cancelled.`,unavailableStatus:`Automatic copying is not available on this device.`}}),Ea=Object.freeze({metadata:Object.freeze({locale:`en`,htmlLang:`en`,direction:`ltr`,title:`Starlight Sokoban | 별빛 창고`,description:`A touch-first puzzle game about guiding starlight crystals into observation rings.`,manifestName:`Starlight Sokoban · 별빛 창고`,manifestShortName:`Starlight`}),messages:Ta,levels:_a,formatters:Object.freeze({date:e=>ba.format(e),integer:W})}),Da=Object.freeze({"sky-01-first-light":{title:`첫 별빛`},"sky-02-step-around":{title:`한 걸음 돌아서`},"sky-03-turning-lane":{title:`회전 통로`},"sky-04-entry-test":{title:`입구 시험`},"sky-05-clear-sky":{title:`맑은 하늘`},"sky-06-corner-warning":{title:`모서리 경보`},"sky-07-back-route":{title:`뒤쪽 길`},"sky-08-safe-approach":{title:`안전한 접근`},"sky-09-wall-orbit":{title:`벽 궤도`},"sky-10-soft-landing":{title:`부드러운 착지`},"sky-11-two-stars":{title:`두 개의 별`},"sky-12-shift-change":{title:`교대 시간`},"sky-13-order-lanes":{title:`순서의 통로`},"sky-14-relay-test":{title:`이어달리기 시험`},"sky-15-twin-rest":{title:`나란한 쉼`},"sky-16-step-away":{title:`한 걸음 멀리`},"sky-17-long-arc":{title:`긴 호`},"sky-18-cross-current":{title:`교차 흐름`},"sky-19-retrograde":{title:`역행`},"sky-20-homeward":{title:`귀환길`},"sky-21-shared-lane":{title:`공용 통로`},"sky-22-traffic-flow":{title:`흐름 정리`},"sky-23-switchyard":{title:`전환 마당`},"sky-24-busy-orbit":{title:`분주한 궤도`},"sky-25-open-channel":{title:`열린 수로`},"sky-26-linked-stars":{title:`이어진 별들`},"sky-27-dependency-chain":{title:`연결 고리`},"sky-28-night-shift":{title:`밤 교대`},"sky-29-grand-observatory":{title:`대관측소`},"sky-30-dawn-return":{title:`새벽 귀환`},"sky-31-sequencing-teach":{title:`깨어난 봉화`},"sky-32-sequencing-practice":{title:`응답하는 빛`},"sky-33-sequencing-combine":{title:`신호가 만나는 곳`},"sky-34-sequencing-test":{title:`한밤의 중계`},"sky-35-sequencing-recover":{title:`고요한 주파수`},"sky-36-sequencing-teach":{title:`새벽의 맥박`},"sky-37-sequencing-practice":{title:`돌아오는 박자`},"sky-38-sequencing-combine":{title:`엮인 리듬`},"sky-39-sequencing-test":{title:`톱니 하늘`},"sky-40-sequencing-recover":{title:`종소리 뒤에`},"sky-41-sequencing-teach":{title:`혜성의 부름`},"sky-42-sequencing-practice":{title:`메아리의 꼬리`},"sky-43-sequencing-combine":{title:`엮인 꼬리빛`},"sky-44-sequencing-test":{title:`유성의 합창`},"sky-45-sequencing-recover":{title:`잦아든 불꽃`},"sky-46-sequencing-teach":{title:`첫 종`},"sky-47-sequencing-practice":{title:`돌아가는 바늘`},"sky-48-sequencing-combine":{title:`나란한 종소리`},"sky-49-sequencing-test":{title:`불꽃의 시간`},"sky-50-sequencing-recover":{title:`잠든 별시계`},"sky-51-sequencing-teach":{title:`등불 신호`},"sky-52-sequencing-practice":{title:`먼 곳의 답신`},"sky-53-sequencing-combine":{title:`엮인 전갈`},"sky-54-sequencing-test":{title:`잡음 폭풍`},"sky-55-sequencing-recover":{title:`맑아진 수신`},"sky-56-sequencing-teach":{title:`별빛 전보`},"sky-57-sequencing-practice":{title:`달빛 전령`},"sky-58-sequencing-combine":{title:`만나는 노선`},"sky-59-sequencing-test":{title:`마지막 송신`},"sky-60-sequencing-recover":{title:`잠든 봉화`},"sky-61-staging-order-teach":{title:`달 부두의 아침`},"sky-62-staging-order-practice":{title:`화물 등불`},"sky-63-staging-order-combine":{title:`화물표 별자리`},"sky-64-staging-order-test":{title:`밤의 출항`},"sky-65-staging-order-recover":{title:`빈 선석`},"sky-66-staging-order-teach":{title:`마당의 등불`},"sky-67-staging-order-practice":{title:`구르는 수레`},"sky-68-staging-order-combine":{title:`오가는 등불`},"sky-69-staging-order-test":{title:`안개 속 기적 소리`},"sky-70-staging-order-recover":{title:`잠든 측선`},"sky-71-staging-order-teach":{title:`구름 정거장`},"sky-72-staging-order-practice":{title:`은빛 수레`},"sky-73-staging-order-combine":{title:`함께 쓰는 승강장`},"sky-74-staging-order-test":{title:`달뜨기 전 분주함`},"sky-75-staging-order-recover":{title:`고요한 승강장`},"sky-76-staging-order-teach":{title:`기록실의 문`},"sky-77-staging-order-practice":{title:`움직이는 선반`},"sky-78-staging-order-combine":{title:`만나는 별지도`},"sky-79-staging-order-test":{title:`기록관의 밤`},"sky-80-staging-order-recover":{title:`먼지 없는 아침`},"sky-81-staging-order-teach":{title:`격납고의 빛`},"sky-82-staging-order-practice":{title:`운반차의 왈츠`},"sky-83-staging-order-combine":{title:`부두의 매듭`},"sky-84-staging-order-test":{title:`천정의 사이렌`},"sky-85-staging-order-recover":{title:`열린 격납고`},"sky-86-staging-order-teach":{title:`새벽의 목록`},"sky-87-staging-order-practice":{title:`종이달`},"sky-88-staging-order-combine":{title:`맞물린 장부`},"sky-89-staging-order-test":{title:`마당 위 종소리`},"sky-90-staging-order-recover":{title:`낮아진 등불`},"sky-91-congestion-teach":{title:`구름 교차로`},"sky-92-congestion-practice":{title:`스쳐 가는 구름`},"sky-93-congestion-combine":{title:`엮인 하늘길`},"sky-94-congestion-test":{title:`천둥 행렬`},"sky-95-congestion-recover":{title:`트인 하늘`},"sky-96-congestion-teach":{title:`궤도의 입구`},"sky-97-congestion-practice":{title:`맴도는 빛`},"sky-98-congestion-combine":{title:`모여드는 달빛`},"sky-99-congestion-test":{title:`분주한 별의 시간`},"sky-100-congestion-recover":{title:`고요한 회전`},"sky-101-congestion-teach":{title:`바람길의 문`},"sky-102-congestion-practice":{title:`뒤따르는 기류`},"sky-103-congestion-combine":{title:`샛바람의 합창`},"sky-104-congestion-test":{title:`교차로의 돌풍`},"sky-105-congestion-recover":{title:`구름의 숨결`},"sky-106-congestion-teach":{title:`유성 항구`},"sky-107-congestion-practice":{title:`다가오는 빛`},"sky-108-congestion-combine":{title:`항구의 합류`},"sky-109-congestion-test":{title:`한밤의 유성우`},"sky-110-congestion-recover":{title:`맑은 정박지`},"sky-111-congestion-teach":{title:`하늘 장터의 아침`},"sky-112-congestion-practice":{title:`등불 무리`},"sky-113-congestion-combine":{title:`뒤얽힌 통로`},"sky-114-congestion-test":{title:`폐장 종의 물결`},"sky-115-congestion-recover":{title:`빈 회랑`},"sky-116-congestion-teach":{title:`빗길 표지`},"sky-117-congestion-practice":{title:`떠도는 우산`},"sky-118-congestion-combine":{title:`머리 위 물길`},"sky-119-congestion-test":{title:`폭풍의 눈`},"sky-120-congestion-recover":{title:`푸른 갬`},"sky-121-counterintuitive-routing-teach":{title:`먼 궤적`},"sky-122-counterintuitive-routing-practice":{title:`헤매는 달`},"sky-123-counterintuitive-routing-combine":{title:`중력의 매듭`},"sky-124-counterintuitive-routing-test":{title:`고리 너머`},"sky-125-counterintuitive-routing-recover":{title:`귀향의 빛`},"sky-126-counterintuitive-routing-teach":{title:`서쪽으로 가는 별`},"sky-127-counterintuitive-routing-practice":{title:`거꾸로 부는 바람`},"sky-128-counterintuitive-routing-combine":{title:`얽힌 나침반`},"sky-129-counterintuitive-routing-test":{title:`북쪽 없는 밤`},"sky-130-counterintuitive-routing-recover":{title:`아침의 방위`},"sky-131-counterintuitive-routing-teach":{title:`휘어지는 혜성`},"sky-132-counterintuitive-routing-practice":{title:`떠도는 꼬리빛`},"sky-133-counterintuitive-routing-combine":{title:`접힌 수평선`},"sky-134-counterintuitive-routing-test":{title:`멀리 돌아가는 길`},"sky-135-counterintuitive-routing-recover":{title:`다시 가까이`},"sky-136-counterintuitive-routing-teach":{title:`숨은 해돋이`},"sky-137-counterintuitive-routing-practice":{title:`그림자 나침반`},"sky-138-counterintuitive-routing-combine":{title:`황혼의 거울`},"sky-139-counterintuitive-routing-test":{title:`일식의 회전`},"sky-140-counterintuitive-routing-recover":{title:`익숙한 동쪽`},"sky-141-counterintuitive-routing-teach":{title:`위로 떨어지는 별`},"sky-142-counterintuitive-routing-practice":{title:`비껴 내리는 비`},"sky-143-counterintuitive-routing-combine":{title:`휘어진 중력`},"sky-144-counterintuitive-routing-test":{title:`근월점의 혜성`},"sky-145-counterintuitive-routing-recover":{title:`부드러운 귀환`},"sky-146-counterintuitive-routing-teach":{title:`잃어버린 자오선`},"sky-147-counterintuitive-routing-practice":{title:`떠도는 바늘`},"sky-148-counterintuitive-routing-combine":{title:`나침반의 합창`},"sky-149-counterintuitive-routing-test":{title:`일식 속 나침반`},"sky-150-counterintuitive-routing-recover":{title:`되찾은 수평선`},"sky-151-multi-box-dependency-teach":{title:`다리 위 등불`},"sky-152-multi-box-dependency-practice":{title:`함께 걷는 발자국`},"sky-153-multi-box-dependency-combine":{title:`맞물린 아치`},"sky-154-multi-box-dependency-test":{title:`별 아래 다리`},"sky-155-multi-box-dependency-recover":{title:`잔잔한 강`},"sky-156-multi-box-dependency-teach":{title:`황동빛 새벽`},"sky-157-multi-box-dependency-practice":{title:`돌아가는 톱니`},"sky-158-multi-box-dependency-combine":{title:`맞물린 톱니`},"sky-159-multi-box-dependency-test":{title:`관측소의 동력`},"sky-160-multi-box-dependency-recover":{title:`황동빛 고요`},"sky-161-multi-box-dependency-teach":{title:`중력의 우물`},"sky-162-multi-box-dependency-practice":{title:`궤도의 동행`},"sky-163-multi-box-dependency-combine":{title:`뒤얽힌 밀물`},"sky-164-multi-box-dependency-test":{title:`천체의 긴장`},"sky-165-multi-box-dependency-recover":{title:`무중력의 고요`},"sky-166-multi-box-dependency-teach":{title:`이어진 빛`},"sky-167-multi-box-dependency-practice":{title:`건너가는 불꽃`},"sky-168-multi-box-dependency-combine":{title:`매듭진 별빛`},"sky-169-multi-box-dependency-test":{title:`별자리의 물결`},"sky-170-multi-box-dependency-recover":{title:`풀려난 빛`},"sky-171-multi-box-dependency-teach":{title:`북쪽 탑`},"sky-172-multi-box-dependency-practice":{title:`속삭이는 돔`},"sky-173-multi-box-dependency-combine":{title:`유리 다리`},"sky-174-multi-box-dependency-test":{title:`한밤의 관측자`},"sky-175-multi-box-dependency-recover":{title:`멀어지는 불빛`},"sky-176-multi-box-dependency-teach":{title:`은빛 격자`},"sky-177-multi-box-dependency-practice":{title:`건너가는 맥박`},"sky-178-multi-box-dependency-combine":{title:`엮인 궤도`},"sky-179-multi-box-dependency-test":{title:`울리는 하늘`},"sky-180-multi-box-dependency-recover":{title:`느슨해진 매듭`},"sky-181-mixed-mastery-teach":{title:`별자리의 문`},"sky-182-mixed-mastery-practice":{title:`별밭의 기억`},"sky-183-mixed-mastery-combine":{title:`천상의 모자이크`},"sky-184-mixed-mastery-test":{title:`밤의 왕관`},"sky-185-mixed-mastery-recover":{title:`별 사이 새벽`},"sky-186-mixed-mastery-teach":{title:`천정의 등불`},"sky-187-mixed-mastery-practice":{title:`망루의 메아리`},"sky-188-mixed-mastery-combine":{title:`하늘유리의 결`},"sky-189-mixed-mastery-test":{title:`오로라의 밤샘`},"sky-190-mixed-mastery-recover":{title:`아침 관측`},"sky-191-mixed-mastery-teach":{title:`일식의 문`},"sky-192-mixed-mastery-practice":{title:`그림자 통로`},"sky-193-mixed-mastery-combine":{title:`빛과 짙은 그림자`},"sky-194-mixed-mastery-test":{title:`달 없는 왕관`},"sky-195-mixed-mastery-recover":{title:`햇빛 드는 통로`},"sky-196-mixed-mastery-teach":{title:`고향별이 뜬다`},"sky-197-mixed-mastery-practice":{title:`익숙한 신호`},"sky-198-mixed-mastery-combine":{title:`모든 빛의 귀환`},"sky-199-mixed-mastery-test":{title:`마지막 밤 관측`},"sky-200-mixed-mastery-recover":{title:`별빛의 집`}}),Oa=new Intl.NumberFormat(`ko-KR`,{maximumFractionDigits:0}),ka=new Intl.DateTimeFormat(`ko-KR`,{year:`numeric`,month:`long`,day:`numeric`});function K(e){return Oa.format(e)}function Aa(e){let t=va(e);switch(t.kind){case`matched`:return`최소 밀기 해법과 같은 기록입니다.`;case`pushes-matched`:return`최소 밀기 ${K(t.pushes)}회와 같고, 이동은 ${K(t.extraMoves)}회 더 많습니다.`;case`tradeoff`:return`최소 밀기 해법보다 ${K(t.extraPushes)}회 더 밀고, ${K(t.fewerMoves)}회 덜 이동했습니다.`;case`same-moves`:return`최소 밀기 해법보다 ${K(t.extraPushes)}회 더 밀었고, 이동 수는 같습니다.`;case`benchmark-ahead`:return`최소 밀기 해법은 밀기 ${K(t.fewerPushes)}회, 이동 ${K(t.fewerMoves)}회가 더 적습니다.`;case`invalid-benchmark`:return`기록된 기준보다 더 좋은 결과입니다.`}}var ja=Object.freeze({bug:`오류`,difficulty:`난이도`,controls:`조작`,visual:`그래픽`,other:`기타`});function Ma(e){let t=`${K(e.filled)}/${K(e.total)}`;switch(e.event){case`level_won`:return`관측 완료. 모든 별빛 결정이 관측 고리에 놓였습니다.`;case`box_pushed`:return`별빛 결정을 밀었습니다. 목표 ${t}.`;case`player_moved`:return`한 칸 이동했습니다. 목표 ${t}.`;case`move_blocked`:return`그 방향으로는 이동할 수 없습니다.`;case`move_undone`:return`이전 이동을 되돌렸습니다. 목표 ${t}.`;case`undo_unavailable`:return`되돌릴 이동이 없습니다.`;case`level_restarted`:return`관측 임무를 처음 상태로 되돌렸습니다.`;case`ready`:return`목표 ${t}.`}}var Na=Object.freeze({brand:{eyebrow:`STARLIGHT SOKOBAN`,title:`별빛 창고`},levelMenu:{eyebrow:e=>`별빛 임무 ${K(e)}개`,title:`관측 임무 선택`,closeLabel:`레벨 선택 닫기`,dailyLevel:({position:e,title:t})=>`오늘의 퍼즐 · ${K(e)}. ${t}`,gridLabel:`캠페인 레벨`,note:`완료하면 다음 임무가 열립니다. 오늘의 퍼즐은 진행도와 별도로 플레이할 수 있습니다.`,choiceLabel:({position:e,title:t,state:n})=>{let r=n===`completed`?`완료`:n===`locked`?`잠김`:`열림`;return`레벨 ${K(e)}: ${t}, ${r}`},pageLabel:({first:e,last:t,total:n,page:r,pageCount:i})=>`레벨 ${K(e)}–${K(t)} / ${K(n)} · ${K(r)} / ${K(i)}페이지`,previousPage:`이전 레벨`,nextPage:`다음 레벨`},mission:{fallbackTitle:`별빛 관측 임무`,fallbackSubtitle:`결정을 관측 고리에 맞춰 보세요`,dailyMode:`오늘의 퍼즐`,campaignMode:({position:e,total:t})=>`캠페인 ${K(e)}/${K(t)}`,levelSelectorLabel:({position:e,total:t})=>`레벨 선택, 현재 ${K(e)}/${K(t)}`,settingsOpenLabel:`설정 열기`,settingsName:`설정`,stateLabel:`게임 상태`},board:{regionLabel:`퍼즐 영역`,inputHelp:({showDirectionButtons:e,wideSwipe:t})=>`화살표 키, W A S D${e?`, 방향 버튼`:``} 또는 ${t?`게임 영역 넓게`:`퍼즐판에서`} 스와이프해 이동합니다.`,summary:({total:e,filled:t})=>`별빛 창고 퍼즐판. 결정 ${K(e)}개 중 ${K(t)}개가 관측 고리에 있습니다.`},stats:{goals:`목표`,moves:`이동`,pushes:`밀기`,goalProgress:({total:e,filled:t})=>`${K(t)}/${K(e)}`},status:{observing:`관측 중`,complete:`관측 완료`},navigation:{nextObservation:`다음 관측`,backToCampaign:`캠페인으로 돌아가기`,missionList:`임무 목록`},actions:{regionLabel:`퍼즐 동작`,undo:`되돌리기`,restart:`다시 시작`,share:`공유`,shareLabel:`결과 공유`},movement:{regionLabel:`방향 이동`,up:`위로 이동`,left:`왼쪽으로 이동`,right:`오른쪽으로 이동`,down:`아래로 이동`},settings:{eyebrow:`LOCAL SETTINGS`,title:`관측 장치 설정`,closeLabel:`설정 닫기`,soundTitle:`효과음`,soundDescription:`별빛 결정을 밀 때 짧은 합성음을 냅니다.`,hapticsTitle:`진동`,hapticsDescription:`지원하는 기기에서만 가볍게 반응합니다.`,reducedMotionTitle:`움직임 줄이기`,reducedMotionDescription:`구름과 장식 움직임을 멈춥니다.`,directionButtonsTitle:`화면 방향 버튼 표시`,directionButtonsDescription:`4방향 패드를 표시합니다. 숨겨도 스와이프와 키보드는 계속 사용할 수 있습니다.`,wideSwipeTitle:`게임 영역 넓게 스와이프`,wideSwipeDescription:`퍼즐판과 주변 게임 영역에서 스와이프합니다. 버튼과 팝업은 제외됩니다.`,languageTitle:`언어`,languageDescription:`한국어와 영어를 바로 전환합니다.`,korean:`한국어`,english:`English`,privacyLink:`개인정보 · 로컬 측정`,feedbackLink:`피드백 메모`},privacy:{eyebrow:`PRIVATE BY DEFAULT`,title:`개인정보와 로컬 측정`,closeLabel:`개인정보 안내 닫기`,localOnlyExplanation:`게임 저장과 로컬 플레이 측정 기록은 이 기기에만 저장되며 서버로 전송되지 않습니다. 직접 동의하고 전송한 피드백만 비공개로 최대 90일 보관합니다. 연락처나 계정은 요청하지 않습니다.`,retentionExplanation:`허용된 플레이 횟수만 날짜·레벨별로 합산해 최대 30일, 512개 항목까지 보관합니다.`,localeExplanation:`언어와 조작 설정은 플레이 저장과 분리해 이 기기에만 보관합니다. 이 선택은 측정하지 않으며, 로컬 측정 기록을 삭제해도 유지됩니다.`,copyMetrics:`로컬 측정 기록 복사`,metricsLabel:`로컬 측정 기록`,clearMetrics:`로컬 측정 기록 삭제`,clearedStatus:`로컬 측정 기록을 삭제했습니다.`,copiedStatus:`로컬 측정 기록을 복사했습니다.`,selectedStatus:`로컬 측정 기록을 선택했습니다. 길게 눌러 복사하세요.`},feedback:{eyebrow:`PRIVATE FEEDBACK`,title:`피드백 메모`,closeLabel:`피드백 메모 닫기`,explanation:`Hostinger의 비공개 피드백함에 의견을 보내거나 메모를 복사하세요. 내용은 최대 90일 보관하며, 암호화된 Supabase 백업에는 최대 7일 더 남을 수 있습니다. 삭제를 요청하려면 여기서 ‘기타’를 선택하고 접수 번호를 보내주세요. 이름, 이메일 등 개인정보는 적지 마세요. 자동 전송되지 않습니다.`,categoryLabel:`피드백 분류`,categories:ja,memoLabel:`만들어진 피드백 메모`,copyMemo:`피드백 메모 복사`,copiedStatus:`피드백 메모를 복사했습니다.`,selectedStatus:`피드백 메모를 선택했습니다. 길게 눌러 복사하세요.`,memo:({category:e,levelId:t})=>`별빛 창고 피드백\n분류: ${ja[e]}\n레벨: ${t}`,messageLabel:`피드백 내용`,messageHelp:`앞뒤 공백을 제외하고 10~2,000자. 초안은 이 페이지를 닫을 때까지 메모리에만 남으며, 창을 다시 열어도 유지됩니다.`,previewLabel:`전송할 보고서`,previewMeta:({category:e,levelId:t,appVersion:n,locale:r})=>`분류: ${e}\n레벨: ${t}\n빌드: ${n}\n언어: ${r}`,consent:`이 보고서를 전송하고 비공개로 최대 90일 보관하는 데 동의합니다.`,send:`피드백 보내기`,clear:`초안 지우기`,copyReport:`보고서 복사`,sending:`전송 중입니다. 잠시 기다려 주세요.`,received:e=>`접수되었습니다. 접수 번호: ${e}`,failed:`접수를 확인하지 못했습니다. 초안은 유지됩니다. 연결을 확인하고 다시 보내거나 보고서를 복사하세요.`,rateLimited:`요청이 너무 많습니다. 초안은 유지됩니다. 몇 분 뒤 다시 보내거나 복사하세요.`,invalid:`10~2,000자를 입력하고 전송에 동의해 주세요. 계속 거절되면 보고서를 복사하세요.`,conflict:`요청이 일치하지 않습니다. 초안은 유지됩니다. 복사하거나 내용을 수정한 뒤 다시 보내세요.`,cleared:`초안을 지웠습니다.`},manualShare:{eyebrow:`COPY RESULT`,title:`결과 직접 복사`,closeLabel:`직접 복사 닫기`,resultLabel:`공유 결과 직접 복사`,selectionHelp:`전체 텍스트를 선택했습니다. 길게 눌러 복사하세요.`},result:{dialogLabel:`관측 결과`,comparisonLabel:`완료 기록 비교`,eyebrow:`MISSION COMPLETE`,title:`관측 완료!`,playerRecord:`내 기록`,optimalRecord:`최소 밀기 해법`,moves:`이동`,pushes:`밀기`,optimalRule:`밀기를 최소화하고, 그 해법들 안에서 이동도 최소화합니다.`,viewBoard:`보드 보기`,completionMessage:Aa,summary:({moves:e,pushes:t})=>`이동 ${K(e)} · 밀기 ${K(t)}`},announcements:{event:Ma},share:{title:`별빛 창고`,text:({date:e,moves:t,pushes:n,solved:r})=>{let i=r?`✦ 관측 완료`:`◇ 관측 중`;return[`별빛 창고 ${e}`,`${i} · 이동 ${K(t)} · 밀기 ${K(n)}`,`#GSokoban`].join(`
`)},sharedStatus:`결과를 공유했습니다.`,copiedStatus:`결과를 복사했습니다.`,cancelledStatus:`공유를 취소했습니다.`,unavailableStatus:`이 기기에서는 자동 복사를 사용할 수 없습니다.`}}),Pa=Object.freeze({metadata:Object.freeze({locale:`ko`,htmlLang:`ko`,direction:`ltr`,title:`별빛 창고 | Starlight Sokoban`,description:`별빛 결정을 관측 고리로 옮기는 터치 중심 퍼즐 게임입니다.`,manifestName:`Starlight Sokoban · 별빛 창고`,manifestShortName:`Starlight`}),messages:Na,levels:Da,formatters:Object.freeze({date:e=>ka.format(e),integer:K})});function Fa(e,t,n=155){if(!Number.isInteger(n)||n<1||n>t.length)throw RangeError(`Seed target is outside the campaign.`);if(e.campaign.highestUnlocked>=n)return;let r=new Set([...e.campaign.completedLevelIds,...t.slice(0,n-1)]);return{...e,campaign:{highestUnlocked:n,completedLevelIds:[...r].toSorted()},current:null}}function Ia(e,t){if(!t.categories[e.category]||!ze(e.levelId))throw Error(`Feedback selection is invalid`);return t.memo(e)}function La(e=(...e)=>fetch(...e)){let t={category:`bug`,message:``,levelId:``,appVersion:`local-development`,locale:`en`},n,r=!1,i=0,a,o=()=>{i++,a?.(),a=void 0,r=!1};return{read:()=>({...t,pending:r}),update(e){Object.entries(e).some(([e,n])=>t[e]!==n)&&(o(),t={...t,...e},n=void 0)},clear(){o(),t={...t,message:``,category:`bug`},n=void 0},cancel:o,async send(o){if(r)return{kind:`busy`};let s=t.message.trim();if(!o||s.length<10||s.length>2e3||!t.levelId)return{kind:`invalid`};r=!0;let c=++i,l=new AbortController,u;try{n??=crypto.randomUUID();let r=new Promise((e,t)=>{a=()=>{l.abort(),t(Error(`Feedback interrupted`))},u=setTimeout(()=>a?.(),1e4)}),o=await Promise.race([e(`/api/feedback`,{method:`POST`,credentials:`omit`,cache:`no-store`,headers:{"Content-Type":`application/json`},body:JSON.stringify({requestId:n,...t,message:s,website:``}),signal:l.signal}),r]),d=await Promise.race([o.json(),r]);if(c!==i)return{kind:`cancelled`};if(d&&typeof d==`object`){if((o.status===200||o.status===201)&&`status`in d&&d.status===`received`&&`receiptId`in d&&typeof d.receiptId==`string`&&/^[A-Za-z0-9_-]{8,160}$/.test(d.receiptId))return t={...t,message:``},n=void 0,{kind:`received`,receiptId:d.receiptId};if(!o.ok&&`error`in d&&[`invalid_request`,`forbidden`,`rate_limited`,`conflict`].includes(String(d.error)))return{kind:`failed`,error:d.error}}return{kind:`failed`,error:`unavailable`}}catch{return c===i?{kind:`failed`,error:`unavailable`}:{kind:`cancelled`}}finally{clearTimeout(u),c===i&&(r=!1,a=void 0)}}}}var q=La();function Ra(e,t){let n=t=>{let n=e.querySelector(t);if(!n)throw Error(`Missing feedback control: ${t}`);return n},r=n(`#feedback-category`),i=n(`#feedback-message`),a=n(`#feedback-consent`),o=n(`#feedback-preview`),s=n(`[data-submission-status]`),c=n(`[data-action='send-feedback']`),l=n(`[data-action='clear-feedback']`),u=n(`[data-action='copy-report']`),d={locale:t.locale,levelId:t.levelId,appVersion:`aca1d637b1b3`},f=t.copy,p=!1,m=()=>{let t=q.read();r.value=t.category,i.value=t.message,o.value=`${f.previewMeta({...t,category:f.categories[t.category]})}\n\n${t.message.trim()}`,c.disabled=t.pending||!a.checked||t.message.trim().length<10||t.message.trim().length>2e3,r.disabled=t.pending,i.disabled=t.pending,a.disabled=t.pending,e.setAttribute(`aria-busy`,String(t.pending))},h=()=>{q.update({message:i.value,category:r.value}),a.checked=!1,s.textContent=``,m()},g=()=>m(),_=async()=>{let e=q.send(a.checked);q.read().pending&&(s.textContent=f.sending),m();let t=await e;p||t.kind===`cancelled`||t.kind===`busy`||(t.kind===`received`?(s.textContent=f.received(t.receiptId),a.checked=!1):t.kind===`invalid`?s.textContent=f.invalid:t.kind===`failed`&&(s.textContent=t.error===`rate_limited`?f.rateLimited:t.error===`invalid_request`?f.invalid:t.error===`conflict`?f.conflict:f.failed),m())},v=()=>{q.clear(),a.checked=!1,s.textContent=f.cleared,m(),r.dispatchEvent(new Event(`change`)),s.textContent=f.cleared},y=async()=>{try{await navigator.clipboard.writeText(o.value),p||(s.textContent=f.copiedStatus)}catch{if(p)return;o.focus(),o.select(),s.textContent=f.selectedStatus}};return r.addEventListener(`change`,h),i.addEventListener(`input`,h),a.addEventListener(`change`,g),c.addEventListener(`click`,_),l.addEventListener(`click`,v),u.addEventListener(`click`,y),{open(){q.update(d),m()},destroy(){p=!0,q.cancel(),r.removeEventListener(`change`,h),i.removeEventListener(`input`,h),a.removeEventListener(`change`,g),c.removeEventListener(`click`,_),l.removeEventListener(`click`,v),u.removeEventListener(`click`,y)}}}function za(e){let t,n=n=>{if(e.AudioContext)try{t??=new e.AudioContext;let r=t.createOscillator(),i=t.createGain(),a=t.currentTime;r.type=`square`,r.frequency.value=n?740:420,i.gain.setValueAtTime(.025,a),i.gain.exponentialRampToValueAtTime(.001,a+(n?.16:.08)),r.connect(i),i.connect(t.destination),r.start(a),r.stop(a+(n?.16:.08))}catch{}};return Object.freeze({notify(t,r){let i=t.some(e=>e.type===`level_won`),a=t.some(e=>e.type===`box_pushed`);if(i||a){if(r.haptics&&e.vibrate)try{e.vibrate(i?[18,24,28]:12)}catch{}r.sound&&n(i)}}})}function Ba(e){return e.terrain.reduce((e,t)=>e+[...t].filter(e=>e===`.`).length,0)}function Va(e,t){let n=t??me(e),r=Ba(e);return Object.freeze({level:e,snapshot:()=>Object.freeze({levelId:e.id,state:n,stateHash:_e(n),status:Bi(e,n),moves:n.moves,pushes:n.pushes,goalsFilled:n.boxes.filter(t=>T(e,t)).length,goalsTotal:r}),dispatch(t){let r=Wi(e,n,t);return n=r.state,r}})}var Ha=new Map([[`arrowup`,`up`],[`w`,`up`],[`arrowright`,`right`],[`d`,`right`],[`arrowdown`,`down`],[`s`,`down`],[`arrowleft`,`left`],[`a`,`left`]]);function Ua(e){if(e.repeat||e.isComposing||e.metaKey||e.ctrlKey||e.altKey)return;let t=Ha.get(e.key.toLowerCase());return t?Object.freeze({type:`move`,direction:t}):void 0}function Wa(e){if(e.cancelled)return;let t=e.endX-e.startX,n=e.endY-e.startY,r=Math.abs(t),i=Math.abs(n),a=Math.max(r,i);if(!(a<24||a<Math.min(r,i)*1.25))return Object.freeze(r>i?{type:`move`,direction:t>0?`right`:`left`}:{type:`move`,direction:n>0?`down`:`up`})}function Ga(e){if(e.activePointerId!==void 0)return e.activePointerId===e.pointerId?Object.freeze({kind:`ignore`,reason:`duplicate-pointer`}):Object.freeze({kind:`cancel-active`,reason:`additional-pointer`});if(e.dialogOpen)return Object.freeze({kind:`ignore`,reason:`dialog-open`});if(e.surface===null)return Object.freeze({kind:`ignore`,reason:`no-surface`});if(e.button!==0)return Object.freeze({kind:`ignore`,reason:`non-primary-button`});if(e.pointerType!==`touch`||!e.isPrimary)return Object.freeze({kind:`ignore`,reason:`not-primary-touch`});if(e.surface===`play-area`&&!e.wideSwipeEnabled)return Object.freeze({kind:`ignore`,reason:`setting-disabled`});let t=e.edgeGuardPx??24;return e.clientX<t||e.clientX>e.viewportWidth-t||e.clientY<t||e.clientY>e.viewportHeight-t?Object.freeze({kind:`ignore`,reason:`edge-guard`}):Object.freeze({kind:`start`,surface:e.surface})}function Ka(e,t){return t.text(e)}function qa(e){return e instanceof Error&&e.name===`AbortError`}async function Ja(e,t,n){if(n.share)try{return await n.share({title:t,text:e}),`shared`}catch(e){if(qa(e))return`cancelled`}if(n.clipboard)try{return await n.clipboard.writeText(e),`copied`}catch{return`unavailable`}return`unavailable`}var J=32;function Ya(e,t){return`<g class="tile floor" data-tile="floor" transform="translate(${e*J} ${t*J})">
    <rect x="0" y="0" width="32" height="32" rx="1" />
    <path d="M2 30H30M30 2V30" />
    <path class="floor-inlay" d="M5 6h3v1H5zM24 24h2v2h-2z" />
  </g>`}function Xa(e,t){let n=e*J,r=t*J,i=(e+t)%2==0;return`<g class="tile wall" data-tile="wall" transform="translate(${n} ${r})">
    <rect class="wall-outline" x="0" y="0" width="32" height="32" rx="2" />
    <rect class="wall-brick" x="2" y="2" width="28" height="28" rx="1" />
    <path class="wall-mortar" d="M2 16H30M${i?16:10} 2V16M${i?9:22} 16V30" />
    <path class="wall-light" d="M4 4H${i?14:8}M4 18H${i?7:20}" />
  </g>`}function Za(e,t){let n=e*J+16,r=t*J+16;return`<g class="goal" data-tile="goal">
    <circle class="goal-shadow" cx="${n}" cy="${r}" r="11" />
    <circle class="goal-ring" cx="${n}" cy="${r}" r="9" />
    <path class="goal-star" d="M${n} ${r-7}L${n+2} ${r-2}L${n+7} ${r}L${n+2} ${r+2}L${n} ${r+7}L${n-2} ${r+2}L${n-7} ${r}L${n-2} ${r-2}Z" />
  </g>`}function Qa(e,t,n){let r=e*J,i=t*J;return`<g class="crystal-wrap${n?` is-on-goal`:``}" data-tile="crystal" data-state="${n?`occupied-goal`:`floor`}" transform="translate(${r} ${i})">
    <path class="crystal-shadow" d="M7 8L15 4L25 8L29 17L23 27L11 28L4 20Z" />
    <path class="crystal" d="M8 6L17 3L26 9L28 18L22 27L10 26L4 18Z" />
    <path class="crystal-facet" d="M17 3L15 15L26 9M15 15L22 27M15 15L4 18M9 8L15 15" />
    <path class="crystal-shine" d="M10 8H14V10H10zM8 11H10V13H8z" />
    ${n?`<g class="goal-halo" data-state="occupied-goal">
        <circle cx="16" cy="16" r="14" />
        <path d="M16 0V5M16 27V32M0 16H5M27 16H32" />
      </g>`:``}
  </g>`}function $a(e,t){return`<g class="robot" data-tile="player" transform="translate(${e*J} ${t*J})">
    <path class="robot-scarf" d="M7 10L1 7L3 13L0 17L9 16Z" />
    <rect class="robot-shadow" x="8" y="7" width="19" height="22" rx="7" />
    <rect class="robot-body" x="7" y="5" width="19" height="22" rx="7" />
    <rect class="robot-face" x="9" y="9" width="15" height="8" rx="2" />
    <rect class="robot-eye" x="12" y="11" width="3" height="3" />
    <rect class="robot-eye" x="19" y="11" width="3" height="3" />
    <path class="robot-brass" d="M11 20H22V24H11zM15 2H18V6H15z" />
  </g>`}function eo(e,t,n,r,i,a=[]){let o=new Set(n.boxes.map(b)),s=[],c=[];for(let e=0;e<t.height;e+=1)for(let n=0;n<t.width;n+=1){let r=t.terrain[e]?.[n];r===`#`?s.push(Xa(n,e)):(r===`-`||r===`.`)&&s.push(Ya(n,e)),r===`.`&&c.push(Za(n,e))}let l=n.boxes.map(e=>Qa(e.x,e.y,T(t,e))),u=n.boxes.filter(e=>T(t,e)).length,d=i.summary({total:n.boxes.length,filled:u}),f=d.replace(/[&<>]/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`})[e]??e);e.setAttribute(`viewBox`,`0 0 ${t.width*J} ${t.height*J}`),e.setAttribute(`aria-label`,d),e.setAttribute(`data-state-hash`,r),e.setAttribute(`data-last-event`,a.at(-1)?.type??`ready`),e.style.aspectRatio=`${t.width} / ${t.height}`,e.classList.toggle(`is-push`,a.some(e=>e.type===`box_pushed`)),e.classList.toggle(`is-walk`,a.some(e=>e.type===`player_moved`)),e.innerHTML=`<title>${f}</title>${s.join(``)}${c.join(``)}${l.join(``)}${$a(n.player.x,n.player.y)}`,e.dataset.boxCount=String(o.size)}function to(e,t){let n=e.findIndex(e=>e.position===t);return n<0?0:Math.floor(n/20)}function no(e,t){let n=Math.max(1,Math.ceil(e.length/20)),r=Number.isFinite(t)?Math.trunc(t):0,i=Math.max(0,Math.min(n-1,r)),a=i*20,o=Object.freeze(e.slice(a,a+20)),s=o[0]?.position??0,c=o.at(-1)?.position??0;return Object.freeze({entries:o,pageIndex:i,page:i+1,pageCount:n,first:s,last:c,total:e.length,hasPrevious:i>0,hasNext:i<n-1})}var ro=`gsk.reveal.trigger`,io=`gsk.reveal155.done`,ao=`reveal155`,oo=[`4a0e561bf9c8dfb81a35673b11639bbd0e1c2b636140bbf685ccd32193a05367`,`c28dc1c6cc690308ad64e7540ca7f2040403b0203750ac57d7d546c05b14bf80`,`92e427bc8be4b59de52d2288e88015db9fc181dcc03f47982ebd39d36f1afd62`];function so(e){return e.mode===`campaign`&&e.position===(e.target??155)&&!e.done}function co(e){if(e==null||!/^\d{1,3}$/.test(e))return;let t=Number(e);return t>=1&&t<=200?t:void 0}function lo(e){try{return co(e?.getItem(`gsk.reveal.trigger`))??155}catch{return 155}}function uo(e,t){try{e?.setItem(ro,String(t))}catch{}}function fo(e){try{return e?.getItem(io)===`1`}catch{return!1}}function po(e){try{e?.setItem(io,`1`)}catch{}}function mo(e){return e.replace(/\D/g,``)}async function ho(e){let t=await crypto.subtle.digest(`SHA-256`,new TextEncoder().encode(e));return[...new Uint8Array(t)].map(e=>e.toString(16).padStart(2,`0`)).join(``)}async function go(e,t=oo){return e.length===t.length&&(await Promise.all(e.map(e=>ho(`rv:${mo(e)}`)))).every((e,n)=>e===t[n])}var _o=`seed154`,vo=[_o,`seed`,`trigger`,ao];function yo(e){return e.replace(/^#/,``).split(/[&,;]/).filter(Boolean)}function bo(e){let t=e.indexOf(`=`);return t<0?e:e.slice(0,t)}function xo(e,t,n){let r=e.get(n);if(r!==null)return r;let i=t.find(e=>bo(e)===n&&e.includes(`=`));return i?i.slice(n.length+1):null}function So(e,t){let n=new URLSearchParams(e),r=yo(t),i=r.includes(_o)||n.has(_o),a=co(xo(n,r,`seed`)),o=co(xo(n,r,`trigger`));return{reveal:r.includes(`reveal155`)||n.has(`reveal155`),seed:a??(i?154:void 0),trigger:o??(i?155:void 0)}}function Co(e,t,n){let r=new URLSearchParams(t);for(let e of vo)r.delete(e);let i=r.toString(),a=yo(n).filter(e=>!vo.includes(bo(e)));return`${e}${i?`?${i}`:``}${a.length>0?`#${a.join(`&`)}`:``}`}var wo={ko:{title:`우리 가족 세 사람의 생일을 입력하세요`,labels:[`아빠`,`엄마`,`형`],unlock:`UNLOCK`,denied:`ACCESS DENIED, 다시 시도하세요`,sub:`YYYY-MM-DD 또는 YYYYMMDD`,boyHeadline:`IT'S A BOY!`,boySub:`Baby #2 — build succeeded 🎉💙`,boyNote:`형이 곧 남동생을 만나요!`,close:`닫기`},en:{title:`Enter our three family birthdays to continue`,labels:[`Dad`,`Mom`,`Big brother`],unlock:`UNLOCK`,denied:`ACCESS DENIED, try again`,sub:`YYYY-MM-DD or YYYYMMDD`,boyHeadline:`IT'S A BOY!`,boySub:`Baby #2 — build succeeded 🎉💙`,boyNote:`The big brother is about to have a little brother!`,close:`Close`}},To=[[`$ git clone family.git && cd family`,``],[`$ ./gender_reveal --baby 2`,``],[`Loading ultrasound data... ok`,`dim`],[`Running DNA gender classifier v2.0...`,`dim`],[`> probability(girl) = 0.00`,`err`],[`Uncaught Exception: GirlNotFoundError at baby.gender (line 2)`,`err`],[`Attempting fallback...`,``],[`$ sudo chmod +x boy.sh`,``],[`> probability(boy)  = 1.00`,``],[`Compiling... ██████████ 100%`,``],[`Build succeeded: 1 boy, 0 errors, 0 warnings`,``],[`Deploying to production... ✔`,`dim`]],Eo={charMs:25,lineMs:600,endMs:800},Do={charMs:0,lineMs:150,endMs:300},Oo;function ko(e){return new Promise(t=>window.setTimeout(t,e))}function Y(e,t,n){let r=document.createElement(e);return t&&(r.className=t),n!==void 0&&(r.textContent=n),r}function Ao(e){if(Oo)return;let t=wo[e.locale],n=window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches===!0,r=e.timing??(n?Do:Eo),i=document.activeElement instanceof HTMLElement?document.activeElement:null,a=Y(`dialog`,`reveal155`);a.dataset.testid=`reveal155`,a.dataset.stage=`gate`,a.lang=e.locale;let o=!1,s=Y(`form`,`reveal155-gate`);s.noValidate=!0,s.autocomplete=`off`;let c=Y(`h2`,`reveal155-title`,t.title);c.id=`reveal155-title`,a.setAttribute(`aria-labelledby`,c.id);let l=Y(`p`,`reveal155-hint`,t.sub);s.append(c,l);let u=[];t.labels.forEach((e,t)=>{let n=`reveal155-b${t+1}`,r=Y(`label`,`reveal155-label`,e);r.htmlFor=n;let i=Y(`input`,`reveal155-input`);i.id=n,i.type=`text`,i.inputMode=`numeric`,i.autocomplete=`off`,i.placeholder=`YYYY-MM-DD`,i.maxLength=12,i.spellcheck=!1,i.setAttribute(`autocapitalize`,`off`),i.setAttribute(`enterkeyhint`,t===2?`go`:`next`),u.push(i),s.append(r,i)});let d=Y(`button`,`reveal155-unlock`,t.unlock);d.type=`submit`;let f=Y(`p`,`reveal155-message`);f.setAttribute(`role`,`alert`),f.dataset.testid=`reveal155-message`,s.append(d,f);let p=Y(`div`,`reveal155-terminal`);p.hidden=!0,p.setAttribute(`aria-live`,`polite`);let m=Y(`div`,`reveal155-boy`);m.hidden=!0;let h=Y(`button`,`reveal155-close`,t.close);h.type=`button`,m.append(Y(`h1`,`reveal155-headline`,t.boyHeadline),Y(`p`,`reveal155-sub`,t.boySub),Y(`p`,`reveal155-sub`,t.boyNote),h),a.append(s,p,m),a.addEventListener(`keydown`,e=>{e.stopPropagation(),e.key===`Escape`&&!o&&e.preventDefault()}),a.addEventListener(`cancel`,e=>{o||e.preventDefault()}),a.addEventListener(`close`,()=>{!o&&a.isConnected&&a.showModal()});let g=!1,_=async()=>{if(!g){g=!0,a.dataset.stage=`terminal`,s.hidden=!0,p.hidden=!1;for(let[e,t]of To){let n=Y(`div`,t?`reveal155-line ${t}`:`reveal155-line`);p.append(n);for(let t of e)n.textContent+=t,r.charMs>0&&await ko(r.charMs);await ko(r.lineMs)}await ko(r.endMs),p.hidden=!0,m.hidden=!1,a.dataset.stage=`boy`,o=!0,e.skipGate||po(e.storage),h.focus()}},v=!1;s.addEventListener(`submit`,e=>{e.preventDefault(),!v&&(v=!0,d.disabled=!0,go(u.map(e=>e.value)).then(e=>{if(v=!1,d.disabled=!1,!e){f.textContent=t.denied,a.dataset.denied=`true`,u[0]?.focus();return}f.textContent=``,_()},()=>{v=!1,d.disabled=!1,f.textContent=t.denied}))});for(let e of u)e.addEventListener(`input`,()=>{f.textContent=``,delete a.dataset.denied});h.addEventListener(`click`,()=>{o=!0,a.close(),a.remove(),Oo=void 0,i?.focus?.(),e.onClose?.()}),document.body.append(a),Oo=a,typeof a.showModal==`function`?a.showModal():a.setAttribute(`open`,``),e.skipGate?_():u[0]?.focus()}function jo(e,t){let n=lo(t.storage);return so({...e,target:n,done:fo(t.storage)})?(Ao(t),!0):!1}function X(e,t){let n=e.querySelector(t);if(!n)throw Error(`Game shell element is missing: ${t}`);return n}function Mo(e,t){if(t.current?.levelId!==e.id)return;let n=ye(e,t.current.state);return n.ok?n.value:void 0}function No(e,t,n,r){let i=e.some(e=>e.type===`level_won`)?`level_won`:e.at(-1)?.type??`ready`;return r.event({event:i,filled:t,total:n})}function Po(){let e={};return typeof navigator.share==`function`&&(e.share=navigator.share.bind(navigator)),navigator.clipboard&&typeof navigator.clipboard.writeText==`function`&&(e.clipboard={writeText:navigator.clipboard.writeText.bind(navigator.clipboard)}),e}function Fo(e){document.documentElement.dataset.reducedMotion=String(e.settings.reducedMotion)}function Z(e){return e.replace(/[&<>'"]/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,"'":`&#39;`,'"':`&quot;`})[e]??e)}var Io=[`dialog`,`form`,`header`,`button`,`a`,`input`,`select`,`textarea`,`label`,`[role='button']`,`[role='status']`,`[contenteditable]:not([contenteditable='false'])`,`[data-swipe-block]`].join(`,`);function Lo(e){if(!(e instanceof Element)||e.closest(Io))return null;let t=e.closest(`[data-swipe-surface]`)?.getAttribute(`data-swipe-surface`);return t===`board`||t===`play-area`?t:null}function Ro(e,t,n){let r=e.catalog.messages.levelMenu;return n.map(({id:n,position:i,title:a})=>{let o=i>t.campaign.highestUnlocked,s=t.campaign.completedLevelIds.includes(n),c=i===e.campaignPosition,l=s?`completed`:o?`locked`:`open`,u=r.choiceLabel({position:i,title:a,state:l});return`<button class="level-choice${s?` is-complete`:``}" type="button" data-level-position="${i}" aria-label="${Z(u)}"${o?` disabled`:``}${c?` aria-current="true"`:``}><span>${e.catalog.formatters.integer(i)}</span>${s?`<span aria-hidden="true">✓</span>`:``}</button>`}).join(``)}function zo(e,t,n){let r=e.catalog.messages.levelMenu,i=e.campaignLevels??[],a=i.find(({id:e})=>e===n),o=no(i,to(i,e.campaignPosition)),s=r.pageLabel(o);return`<dialog class="level-dialog" aria-labelledby="level-dialog-title">
    <form method="dialog">
      <header><div><p class="eyebrow">${Z(r.eyebrow(i.length))}</p><h2 id="level-dialog-title">${Z(r.title)}</h2></div><button type="submit" aria-label="${Z(r.closeLabel)}">×</button></header>
      ${a?`<button class="daily-level-button" type="button" data-action="daily-level">${Z(r.dailyLevel(a))}</button>`:``}
      <div class="level-pagination">
        <button type="button" data-action="previous-level-page" aria-label="${Z(r.previousPage)}"${o.hasPrevious?``:` disabled`}>←</button>
        <p data-level-page-status aria-live="polite">${Z(s)}</p>
        <button type="button" data-action="next-level-page" aria-label="${Z(r.nextPage)}"${o.hasNext?``:` disabled`}>→</button>
      </div>
      <div class="level-grid" aria-label="${Z(r.gridLabel)}">${Ro(e,t,o.entries)}</div>
      <p class="level-dialog-note">${Z(r.note)}</p>
    </form>
  </dialog>`}function Bo(e,t,n,r,i,a,o){let{catalog:s}=i,c=s.messages,l=s.levels[e.id],u=Z(l?.title??c.mission.fallbackTitle),d=Z(l?.subtitle??c.mission.fallbackSubtitle),f=i.mode===`daily`?c.mission.dailyMode:c.mission.campaignMode({position:i.campaignPosition,total:i.campaignLength}),p=s.metadata.locale;return`<main class="game-shell" data-testid="game-shell" data-level-id="${Z(e.id)}" data-play-mode="${i.mode??`campaign`}" data-daily-level-id="${Z(r)}" data-locale="${p}" data-wide-swipe="${String(o.wideSwipe)}">
    <header class="topbar">
      <div class="brand-lockup">
        <span class="brand-star" aria-hidden="true">✦</span>
        <div><p class="eyebrow">${Z(c.brand.eyebrow)}</p><h1>${Z(c.brand.title)}</h1></div>
      </div>
      <div class="topbar-actions">
        <button class="level-button" type="button" aria-label="${Z(c.mission.levelSelectorLabel({position:i.campaignPosition,total:i.campaignLength}))}" data-action="levels" data-essential-control>${s.formatters.integer(i.campaignPosition)}/${s.formatters.integer(i.campaignLength)}</button>
        <button class="icon-button" type="button" aria-label="${Z(c.mission.settingsOpenLabel)}" data-action="settings" data-essential-control${i.restoreFocus===`settings`?` autofocus`:``}>⚙<span class="sr-only">${Z(c.mission.settingsName)}</span></button>
      </div>
    </header>

    <section class="mission-card" aria-labelledby="level-title">
      <div class="mission-copy">
        <p class="daily-label"><span data-testid="play-mode-label">${Z(f)}</span> · <time datetime="${Z(t)}" data-testid="daily-date">${Z(n)}</time></p>
        <h2 id="level-title">${u}</h2>
        <p class="mission-hint">${d}</p>
      </div>
      <dl class="stats" aria-label="${Z(c.mission.stateLabel)}">
        <div><dt>${Z(c.stats.goals)}</dt><dd data-testid="goals">0/0</dd></div>
        <div><dt>${Z(c.stats.moves)}</dt><dd data-testid="moves">0</dd></div>
        <div><dt>${Z(c.stats.pushes)}</dt><dd data-testid="pushes">0</dd></div>
      </dl>
    </section>

    <section class="board-stage" aria-label="${Z(c.board.regionLabel)}" data-swipe-surface="play-area">
      <span class="cloud cloud-one" aria-hidden="true"></span>
      <span class="cloud cloud-two" aria-hidden="true"></span>
      <div class="board-frame">
        <span class="frame-star frame-star-one" aria-hidden="true">✦</span>
        <span class="frame-star frame-star-two" aria-hidden="true">✦</span>
        <svg class="board-svg" data-testid="board" data-swipe-surface="board" role="img" tabindex="0" aria-describedby="input-help"></svg>
      </div>
      <p id="input-help" class="sr-only">${Z(c.board.inputHelp(o))}</p>
    </section>

    <div class="status-row">
      <p class="visible-status" data-testid="game-status">${Z(c.status.observing)}</p>
      <button class="next-level" type="button" data-action="next-level" aria-label="${Z(c.navigation.nextObservation)}" hidden>${Z(c.navigation.nextObservation)} →</button>
    </div>

    <div class="control-deck" data-testid="control-deck" data-swipe-block>
      <nav class="quick-actions" data-testid="quick-actions" aria-label="${Z(c.actions.regionLabel)}">
        <button type="button" data-action="undo" data-essential-control>↶ <span>${Z(c.actions.undo)}</span></button>
        <button type="button" data-action="restart" data-essential-control>↻ <span>${Z(c.actions.restart)}</span></button>
        <button class="secondary-action" type="button" data-action="share" aria-label="${Z(c.actions.shareLabel)}" data-essential-control>⌁ <span>${Z(c.actions.share)}</span></button>
      </nav>

      <section id="movement-pad" class="movement-pad" data-testid="movement-pad" aria-label="${Z(c.movement.regionLabel)}"${o.showDirectionButtons?``:` hidden`}>
        <button class="direction up" type="button" data-direction="up" aria-label="${Z(c.movement.up)}" data-essential-control>▲</button>
        <button class="direction left" type="button" data-direction="left" aria-label="${Z(c.movement.left)}" data-essential-control>◀</button>
        <button class="direction right" type="button" data-direction="right" aria-label="${Z(c.movement.right)}" data-essential-control>▶</button>
        <button class="direction down" type="button" data-direction="down" aria-label="${Z(c.movement.down)}" data-essential-control>▼</button>
      </section>
    </div>

    <div class="safe-area-reserve" data-testid="safe-area" aria-hidden="true"></div>
    <p class="sr-only" role="status" aria-live="polite" aria-atomic="true" data-live-status></p>

    <dialog class="settings-dialog" aria-labelledby="settings-title">
      <form method="dialog">
        <header><div><p class="eyebrow">${Z(c.settings.eyebrow)}</p><h2 id="settings-title">${Z(c.settings.title)}</h2></div><button type="submit" aria-label="${Z(c.settings.closeLabel)}">×</button></header>
        <label><span><strong>${Z(c.settings.soundTitle)}</strong><small>${Z(c.settings.soundDescription)}</small></span><input type="checkbox" name="sound" /></label>
        <label><span><strong>${Z(c.settings.hapticsTitle)}</strong><small>${Z(c.settings.hapticsDescription)}</small></span><input type="checkbox" name="haptics" /></label>
        <label><span><strong>${Z(c.settings.reducedMotionTitle)}</strong><small>${Z(c.settings.reducedMotionDescription)}</small></span><input type="checkbox" name="reducedMotion" /></label>
        <label><span><strong>${Z(c.settings.directionButtonsTitle)}</strong><small>${Z(c.settings.directionButtonsDescription)}</small></span><input type="checkbox" name="showDirectionButtons" aria-controls="movement-pad" /></label>
        <label><span><strong>${Z(c.settings.wideSwipeTitle)}</strong><small>${Z(c.settings.wideSwipeDescription)}</small></span><input type="checkbox" name="wideSwipe" /></label>
        <fieldset class="language-setting">
          <legend><strong>${Z(c.settings.languageTitle)}</strong><small>${Z(c.settings.languageDescription)}</small></legend>
          <div class="language-options">
            <button type="button" data-locale="ko" aria-pressed="${p===`ko`}">${Z(c.settings.korean)}</button>
            <button type="button" data-locale="en" aria-pressed="${p===`en`}">${Z(c.settings.english)}</button>
          </div>
        </fieldset>
        <div class="settings-links">
          <button type="button" data-action="privacy">${Z(c.settings.privacyLink)}</button>
          <button type="button" data-action="feedback">${Z(c.settings.feedbackLink)}</button>
        </div>
      </form>
    </dialog>

    <dialog class="privacy-dialog" aria-labelledby="privacy-title">
      <form method="dialog">
        <header><div><p class="eyebrow">${Z(c.privacy.eyebrow)}</p><h2 id="privacy-title">${Z(c.privacy.title)}</h2></div><button type="submit" aria-label="${Z(c.privacy.closeLabel)}">×</button></header>
        <p>${Z(c.privacy.localOnlyExplanation)}</p>
        <p>${Z(c.privacy.retentionExplanation)}</p>
        <p>${Z(c.privacy.localeExplanation)}</p>
        <button type="button" data-action="copy-metrics">${Z(c.privacy.copyMetrics)}</button>
        <textarea readonly rows="3" data-metric-export hidden aria-label="${Z(c.privacy.metricsLabel)}"></textarea>
        <button type="button" class="danger-button" data-action="clear-metrics">${Z(c.privacy.clearMetrics)}</button>
        <p class="dialog-status" role="status" data-privacy-status></p>
      </form>
    </dialog>

    <dialog class="feedback-dialog" aria-labelledby="feedback-title">
      <form method="dialog">
        <header><div><p class="eyebrow">${Z(c.feedback.eyebrow)}</p><h2 id="feedback-title">${Z(c.feedback.title)}</h2></div><button type="submit" aria-label="${Z(c.feedback.closeLabel)}">×</button></header>
        <p>${Z(c.feedback.explanation)}</p>
        <label for="feedback-category">${Z(c.feedback.categoryLabel)}</label>
        <select id="feedback-category">
          <option value="bug">${Z(c.feedback.categories.bug)}</option>
          <option value="difficulty">${Z(c.feedback.categories.difficulty)}</option>
          <option value="controls">${Z(c.feedback.categories.controls)}</option>
          <option value="visual">${Z(c.feedback.categories.visual)}</option>
          <option value="other">${Z(c.feedback.categories.other)}</option>
        </select>
        <label for="feedback-message">${Z(c.feedback.messageLabel)}</label>
        <textarea id="feedback-message" rows="4" maxlength="2000" aria-describedby="feedback-message-help" autocomplete="off" spellcheck="false"></textarea>
        <p id="feedback-message-help">${Z(c.feedback.messageHelp)}</p>
        <label for="feedback-preview">${Z(c.feedback.previewLabel)}</label>
        <textarea id="feedback-preview" readonly rows="5"></textarea>
        <label class="feedback-consent" for="feedback-consent"><input id="feedback-consent" type="checkbox"> <span>${Z(c.feedback.consent)}</span></label>
        <div class="feedback-actions">
          <button type="button" data-action="send-feedback" disabled>${Z(c.feedback.send)}</button>
          <button type="button" data-action="copy-report">${Z(c.feedback.copyReport)}</button>
          <button type="button" data-action="clear-feedback">${Z(c.feedback.clear)}</button>
        </div>
        <p class="dialog-status" role="status" aria-live="polite" data-submission-status></p>
        <label for="feedback-text">${Z(c.feedback.memoLabel)}</label>
        <textarea id="feedback-text" readonly rows="3" data-feedback-text></textarea>
        <button type="button" data-action="copy-feedback">${Z(c.feedback.copyMemo)}</button>
        <p class="dialog-status" role="status" data-feedback-status></p>
      </form>
    </dialog>

    <dialog class="manual-share-dialog" aria-labelledby="manual-share-title" data-manual-share>
      <form method="dialog">
        <header>
          <div><p class="eyebrow">${Z(c.manualShare.eyebrow)}</p><h2 id="manual-share-title">${Z(c.manualShare.title)}</h2></div>
          <button type="submit" aria-label="${Z(c.manualShare.closeLabel)}">×</button>
        </header>
        <label for="manual-share-text">${Z(c.manualShare.resultLabel)}</label>
        <textarea id="manual-share-text" readonly rows="3"></textarea>
        <p>${Z(c.manualShare.selectionHelp)}</p>
      </form>
    </dialog>
    <dialog class="result-dialog" aria-label="${Z(c.result.dialogLabel)}" data-result-dialog>
      <form method="dialog">
        <header>
          <div><p class="eyebrow">${Z(c.result.eyebrow)}</p><h2>${Z(c.result.title)}</h2></div>
          <span class="result-star" aria-hidden="true">✦</span>
        </header>
        <p class="result-message" data-result-message></p>
        <dl class="result-stats" aria-label="${Z(c.result.comparisonLabel)}">
          <div class="player-result">
            <dt>${Z(c.result.playerRecord)}</dt>
            <dd><strong data-testid="result-pushes">0</strong><span>${Z(c.result.pushes)}</span><strong data-testid="result-moves">0</strong><span>${Z(c.result.moves)}</span></dd>
          </div>
          <div class="optimal-result">
            <dt>${Z(c.result.optimalRecord)}</dt>
            <dd><strong data-testid="optimal-pushes">${s.formatters.integer(i.optimalResult.pushes)}</strong><span>${Z(c.result.pushes)}</span><strong data-testid="optimal-moves">${s.formatters.integer(i.optimalResult.moves)}</strong><span>${Z(c.result.moves)}</span></dd>
          </div>
        </dl>
        <p class="result-note">${Z(c.result.optimalRule)}</p>
        <div class="result-actions">
          <button type="submit">${Z(c.result.viewBoard)}</button>
          <button class="result-next" type="button" data-action="result-next" autofocus>${Z(c.navigation.nextObservation)}</button>
        </div>
      </form>
    </dialog>
    ${zo(i,a,r)}
  </main>`}function Vo(t,r){let i=r.now??(()=>new Date),o=r.saveStore??ke(r.storage),s=o.read(),c=r.controlPreferences??a(),l=i(),u=e(l),f=r.catalog.formatters.date(l),p=n(l,r.dailyLevelIds??r.campaignLevels?.map(({id:e})=>e)??[r.level.id]),m=Mo(r.level,s),h=r.mode??`campaign`;m&&s.current?.levelId===r.level.id&&s.current.mode!==h&&(s={...s,current:{...s.current,mode:h}},o.write(s));let g=Va(r.level,m);t.innerHTML=Bo(r.level,u,f,p,r,s,c);let _=X(t,`.game-shell`),v=X(t,`.board-stage`),y=X(t,`.board-frame`),ee=X(t,`[data-testid='board']`),te=X(t,`#input-help`),ne=X(t,`#movement-pad`),b=X(t,`[data-live-status]`),x=X(t,`[data-testid='game-status']`),S=X(t,`[data-testid='goals']`),C=X(t,`[data-testid='moves']`),re=X(t,`[data-testid='pushes']`),ie=X(t,`[data-action='undo']`),ae=X(t,`[data-action='restart']`),w=X(t,`[data-action='share']`),T=X(t,`[data-action='settings']`),oe=X(t,`[data-action='levels']`),se=X(t,`[data-action='next-level']`),E=X(t,`.settings-dialog`),ce=X(t,`.privacy-dialog`),le=X(t,`.feedback-dialog`),D=X(t,`.level-dialog`),O=X(t,`.result-dialog`),ue=X(O,`[data-result-message]`),k=X(O,`[data-testid='result-moves']`),de=X(O,`[data-testid='result-pushes']`),fe=X(O,`[data-action='result-next']`),pe=X(t,`.manual-share-dialog`),A=X(pe,`#manual-share-text`),me=X(E,`input[name='sound']`),he=X(E,`input[name='haptics']`),ge=X(E,`input[name='reducedMotion']`),_e=X(E,`input[name='showDirectionButtons']`),ve=X(E,`input[name='wideSwipe']`),ye=t.querySelectorAll(`button[data-locale]`),be=X(t,`[data-action='privacy']`),xe=X(t,`[data-action='feedback']`),Se=X(t,`[data-action='clear-metrics']`),j=X(t,`[data-action='copy-metrics']`),M=X(t,`[data-metric-export]`),N=X(t,`[data-privacy-status]`),P=X(t,`#feedback-category`),F=X(t,`[data-feedback-text]`),Ce=X(t,`[data-action='copy-feedback']`),I=X(t,`[data-feedback-status]`),L=X(D,`.level-grid`),we=X(D,`[data-level-page-status]`),Te=X(D,`[data-action='previous-level-page']`),Ee=X(D,`[data-action='next-level-page']`),De=window.matchMedia(`(prefers-reduced-motion: reduce)`),Oe=za({...typeof navigator.vibrate==`function`?{vibrate:e=>navigator.vibrate(e)}:{},...window.AudioContext?{AudioContext:window.AudioContext}:{}}),R=()=>{document.documentElement.dataset.systemReducedMotion=String(De.matches)},z=()=>{me.checked=s.settings.sound,he.checked=s.settings.haptics,ge.checked=s.settings.reducedMotion,Fo(s)},Ae=()=>{_e.checked=c.showDirectionButtons,ve.checked=c.wideSwipe,ne.hidden=!c.showDirectionButtons,_.dataset.wideSwipe=String(c.wideSwipe),te.textContent=r.catalog.messages.board.inputHelp(c),Ie()},je=r.campaignLevels??[],Ne=to(je,r.campaignPosition),Pe=e=>{let t=no(je,e);Ne=t.pageIndex,L.innerHTML=Ro(r,s,t.entries),we.textContent=r.catalog.messages.levelMenu.pageLabel(t),Te.disabled=!t.hasPrevious,Ee.disabled=!t.hasNext},Fe=()=>{for(let e of t.querySelectorAll(`[data-level-position]`)){let t=Number(e.dataset.levelPosition),n=r.campaignLevels?.find(e=>e.position===t);if(!n)continue;let i=s.campaign.completedLevelIds.includes(n.id),a=t>s.campaign.highestUnlocked;e.disabled=a,e.classList.toggle(`is-complete`,i),e.setAttribute(`aria-label`,r.catalog.messages.levelMenu.choiceLabel({position:t,title:n.title,state:i?`completed`:a?`locked`:`open`}))}},Ie=()=>{let e=getComputedStyle(y),t=Number.parseFloat(e.paddingLeft)+Number.parseFloat(e.paddingRight)+Number.parseFloat(e.borderLeftWidth)+Number.parseFloat(e.borderRightWidth),n=Number.parseFloat(e.paddingTop)+Number.parseFloat(e.paddingBottom)+Number.parseFloat(e.borderTopWidth)+Number.parseFloat(e.borderBottomWidth),i=Math.max(0,Math.min(v.clientWidth,352)-t),a=Math.max(0,v.clientHeight-n),o=r.level.width/r.level.height,s=Math.min(i,a*o),c=s/o;y.style.width=`${s+t}px`,y.style.height=`${c+n}px`},Le=(e=[])=>{let t=g.snapshot();eo(ee,r.level,t.state,t.stateHash,r.catalog.messages.board,e),S.textContent=r.catalog.messages.stats.goalProgress({filled:t.goalsFilled,total:t.goalsTotal}),C.textContent=r.catalog.formatters.integer(t.moves),re.textContent=r.catalog.formatters.integer(t.pushes),ie.disabled=t.moves===0,x.textContent=t.status===`won`?r.catalog.messages.status.complete:r.catalog.messages.status.observing,se.hidden=t.status!==`won`;let n=r.mode===`daily`?r.catalog.messages.navigation.backToCampaign:r.campaignPosition<r.campaignLength?r.catalog.messages.navigation.nextObservation:r.catalog.messages.navigation.missionList;se.textContent=`${n} →`,se.setAttribute(`aria-label`,n),_.dataset.gameStatus=t.status,b.textContent=No(e,t.goalsFilled,t.goalsTotal,r.catalog.messages.announcements),Ie()},Re=()=>{let e=g.snapshot();k.textContent=r.catalog.formatters.integer(e.moves),de.textContent=r.catalog.formatters.integer(e.pushes),ue.textContent=r.catalog.messages.result.completionMessage({moves:e.moves,pushes:e.pushes,optimalMoves:r.optimalResult.moves,optimalPushes:r.optimalResult.pushes});let t=r.mode===`daily`?r.catalog.messages.navigation.backToCampaign:r.campaignPosition<r.campaignLength?r.catalog.messages.navigation.nextObservation:r.catalog.messages.navigation.missionList;fe.textContent=`${t} →`,fe.setAttribute(`aria-label`,t),typeof O.showModal==`function`?O.showModal():(O.setAttribute(`open`,``),fe.focus())},ze=()=>{let e=g.snapshot();s=Me(s,{levelId:r.level.id,state:e.state,won:e.status===`won`,campaignPosition:r.campaignPosition,campaignLength:r.campaignLength,mode:r.mode??`campaign`}),o.write(s),Fe()},Be=e=>{let t=g.dispatch(e);t.events.some(e=>e.type===`player_moved`||e.type===`box_pushed`)&&r.measurement?.recordGameStarted(r.level.id),e.type===`undo`?r.measurement?.recordUndo(r.level.id):e.type===`restart`&&r.measurement?.recordRestart(r.level.id),t.events.some(e=>e.type===`level_won`)&&r.measurement?.recordCompletion(r.level.id,r.campaignPosition,r.mode??`campaign`),ze(),Oe.notify(t.events,s.settings),Le(t.events),t.events.some(e=>e.type===`level_won`)&&(Re(),jo({mode:r.mode??`campaign`,position:r.campaignPosition},{locale:r.catalog.metadata.locale,storage:r.storage}))};m||(s=Me(s,{levelId:r.level.id,state:g.snapshot().state,won:!1,campaignPosition:r.campaignPosition,campaignLength:r.campaignLength,mode:r.mode??`campaign`}),o.write(s)),R(),z(),Ae(),Fe(),Le();let B=t.querySelectorAll(`[data-direction]`),Ve=new Map;for(let e of B){let t=()=>{let t=e.dataset.direction;Be({type:`move`,direction:t})};e.addEventListener(`click`,t),Ve.set(e,t)}let He=()=>Be({type:`undo`}),Ue=()=>Be({type:`restart`});ie.addEventListener(`click`,He),ae.addEventListener(`click`,Ue);let We=async()=>{let e=g.snapshot(),t=Ka({date:f,moves:e.moves,pushes:e.pushes,solved:e.status===`won`},r.catalog.messages.share),n=await Ja(t,r.catalog.messages.share.title,Po());(n===`shared`||n===`copied`)&&e.status===`won`&&r.measurement?.recordShareSucceeded(r.level.id),n===`unavailable`&&(A.value=t,typeof pe.showModal==`function`?pe.showModal():pe.setAttribute(`open`,``),A.focus(),A.select()),b.textContent=n===`shared`?r.catalog.messages.share.sharedStatus:n===`copied`?r.catalog.messages.share.copiedStatus:n===`cancelled`?r.catalog.messages.share.cancelledStatus:r.catalog.messages.share.unavailableStatus};w.addEventListener(`click`,We);let Ge=()=>{typeof E.showModal==`function`?E.showModal():E.setAttribute(`open`,``)};T.addEventListener(`click`,Ge);let Ke=e=>{E.open&&E.close(),typeof e.showModal==`function`?e.showModal():e.setAttribute(`open`,``)},qe=()=>Ke(ce),Je=Ra(le,{copy:r.catalog.messages.feedback,locale:r.catalog.metadata.locale,levelId:r.level.id}),Ye=()=>{Je.open(),F.value=Ia({category:P.value,levelId:r.level.id},r.catalog.messages.feedback),I.textContent=``,Ke(le)},Xe=()=>{F.value=Ia({category:P.value,levelId:r.level.id},r.catalog.messages.feedback)},Ze=()=>{r.metricStore?.clear(),s={...s,analytics:{...s.analytics,counts:{}}},o.write(s,{replaceAnalytics:!0}),N.textContent=r.catalog.messages.privacy.clearedStatus},Qe=async()=>{let e=r.metricStore?.read()??{schema:`g-sokoban/local-metrics`,version:1,records:[]};M.value=JSON.stringify(e,null,2),M.hidden=!1;try{if(!navigator.clipboard||typeof navigator.clipboard.writeText!=`function`)throw Error(`Clipboard unavailable`);await navigator.clipboard.writeText(M.value),N.textContent=r.catalog.messages.privacy.copiedStatus}catch{M.focus(),M.select(),N.textContent=r.catalog.messages.privacy.selectedStatus}},$e=async()=>{Xe(),r.measurement?.recordFeedbackPrepared(r.level.id);try{if(!navigator.clipboard||typeof navigator.clipboard.writeText!=`function`)throw Error(`Clipboard unavailable`);await navigator.clipboard.writeText(F.value),I.textContent=r.catalog.messages.feedback.copiedStatus}catch{F.focus(),F.select(),I.textContent=r.catalog.messages.feedback.selectedStatus}};be.addEventListener(`click`,qe),xe.addEventListener(`click`,Ye),Se.addEventListener(`click`,Ze),j.addEventListener(`click`,Qe),P.addEventListener(`change`,Xe),Ce.addEventListener(`click`,$e);let et=()=>{Pe(to(je,r.campaignPosition)),typeof D.showModal==`function`?D.showModal():D.setAttribute(`open`,``)};oe.addEventListener(`click`,et);let tt=e=>{let t=e.target,n=t instanceof Element?t.closest(`[data-level-position]`):null;if(!n||!L.contains(n))return;let i=Number(n.dataset.levelPosition);!n.disabled&&Number.isInteger(i)&&r.onSelectLevel?.(i,`campaign`)},nt=()=>{Pe(Ne-1)},rt=()=>{Pe(Ne+1)};L.addEventListener(`click`,tt),Te.addEventListener(`click`,nt),Ee.addEventListener(`click`,rt);let it=t.querySelector(`[data-action='daily-level']`),at=()=>{let e=r.campaignLevels?.find(({id:e})=>e===p)?.position;e!==void 0&&r.onSelectLevel?.(e,`daily`)};it?.addEventListener(`click`,at);let ot=()=>{r.mode===`daily`?r.onSelectLevel?.(Math.max(1,Math.min(r.campaignLength,s.campaign.highestUnlocked)),`campaign`):r.campaignPosition<r.campaignLength?r.onSelectLevel?.(r.campaignPosition+1,`campaign`):et()};se.addEventListener(`click`,ot);let st=()=>{O.open&&O.close(),ot()};fe.addEventListener(`click`,st);let V=()=>{s={...s,settings:{sound:me.checked,haptics:he.checked,reducedMotion:ge.checked}},o.write(s),z()},ct=()=>{let e={showDirectionButtons:_e.checked,wideSwipe:ve.checked};c=r.onControlPreferencesChange?.(e)??e,Ae()};me.addEventListener(`change`,V),he.addEventListener(`change`,V),ge.addEventListener(`change`,V),_e.addEventListener(`change`,ct),ve.addEventListener(`change`,ct);let lt=new Map;for(let e of ye){let t=()=>{let t=e.dataset.locale;d(t)&&t!==r.catalog.metadata.locale&&window.setTimeout(()=>r.onLocaleChange?.(t),50)};e.addEventListener(`click`,t),lt.set(e,t)}let ut=e=>{if(E.open||ce.open||le.open||D.open||pe.open||O.open||e.target instanceof HTMLInputElement||e.target instanceof HTMLSelectElement||e.target instanceof HTMLTextAreaElement||e.target instanceof HTMLElement&&e.target.isContentEditable)return;let t=Ua(e);t&&(e.preventDefault(),Be(t))};window.addEventListener(`keydown`,ut),window.addEventListener(`resize`,Ie);let H,dt=()=>t.querySelector(`dialog[open]`)!==null,ft=()=>{if(!H)return;let e=H.id;H=void 0;try{_.hasPointerCapture(e)&&_.releasePointerCapture(e)}catch{}},pt=e=>{let t=Ga({surface:Lo(e.target),wideSwipeEnabled:c.wideSwipe,pointerId:e.pointerId,...H?{activePointerId:H.id}:{},pointerType:e.pointerType,isPrimary:e.isPrimary,button:e.button,dialogOpen:dt(),clientX:e.clientX,clientY:e.clientY,viewportWidth:window.innerWidth,viewportHeight:window.innerHeight});if(t.kind===`cancel-active`){ft();return}if(t.kind!==`ignore`){H={id:e.pointerId,x:e.clientX,y:e.clientY,surface:t.surface};try{_.setPointerCapture(e.pointerId)}catch{}}},mt=e=>{if(!H||H.id!==e.pointerId)return;let t=H;if(ft(),dt()||t.surface===`play-area`&&!c.wideSwipe)return;let n=Wa({startX:t.x,startY:t.y,endX:e.clientX,endY:e.clientY});n&&(e.preventDefault(),Be(n))},ht=e=>{let t=e;H?.id===t.pointerId&&ft()};return _.addEventListener(`pointerdown`,pt),_.addEventListener(`pointerup`,mt),_.addEventListener(`pointercancel`,ht),_.addEventListener(`lostpointercapture`,ht),De.addEventListener(`change`,R),Object.freeze({destroy(){Je.destroy();for(let e of t.querySelectorAll(`dialog[open]`))e.close();window.removeEventListener(`keydown`,ut),window.removeEventListener(`resize`,Ie),ft(),_.removeEventListener(`pointerdown`,pt),_.removeEventListener(`pointerup`,mt),_.removeEventListener(`pointercancel`,ht),_.removeEventListener(`lostpointercapture`,ht),De.removeEventListener(`change`,R),ie.removeEventListener(`click`,He),ae.removeEventListener(`click`,Ue),w.removeEventListener(`click`,We),T.removeEventListener(`click`,Ge),be.removeEventListener(`click`,qe),xe.removeEventListener(`click`,Ye),Se.removeEventListener(`click`,Ze),j.removeEventListener(`click`,Qe),P.removeEventListener(`change`,Xe),Ce.removeEventListener(`click`,$e),oe.removeEventListener(`click`,et),L.removeEventListener(`click`,tt),Te.removeEventListener(`click`,nt),Ee.removeEventListener(`click`,rt),se.removeEventListener(`click`,ot),fe.removeEventListener(`click`,st),it?.removeEventListener(`click`,at),me.removeEventListener(`change`,V),he.removeEventListener(`change`,V),ge.removeEventListener(`change`,V),_e.removeEventListener(`change`,ct),ve.removeEventListener(`change`,ct);for(let[e,t]of lt)e.removeEventListener(`click`,t);for(let[e,t]of Ve)e.removeEventListener(`click`,t);t.replaceChildren()}})}var Ho=document.querySelector(`#app`);if(!Ho)throw Error(`App root is missing.`);var Uo=Ho,Q;try{Q=window.localStorage}catch{Q=void 0}var Wo=new Date,Go=Object.freeze({ko:Pa,en:Ea}),Ko=U.levels.map(({entry:e,level:t},n)=>{let r=U.runtime.entries[n];if(!r)throw Error(`Runtime campaign summary is missing for ${t.id}.`);return{id:t.id,position:e.position,wave:e.wave,optimalMoves:r.optimalMoves,optimalPushes:r.optimalPushes}}),qo=n(Wo,ma),$=ke(Q,fa),Jo=c(Q),Yo=h(Q,navigator.languages.length>0?navigator.languages:[navigator.language]),Xo=Ye(Q),Zo=Ne(Xo);Zo.start(`app`);var Qo,$o=`app`,es=Yo.read(),ts=Jo.read(),ns;window.addEventListener(`error`,e=>{Zo.captureError($o,e.error??e.message)}),window.addEventListener(`unhandledrejection`,e=>{Zo.captureError($o,e.reason)});function rs(e){document.documentElement.lang=e.metadata.htmlLang,document.documentElement.dir=e.metadata.direction,document.title=e.metadata.title,document.querySelector(`meta[name="description"]`)?.setAttribute(`content`,e.metadata.description)}function is(e,t=!1,n=!0){ns=e;let r=Go[es];rs(r);let i=ha(U,e.position),a=Ko.find(({id:e})=>e===i.level.id);if(!a)throw Error(`Campaign summary is missing for ${i.level.id}.`);let o=pa({level:i.level,optimalMoves:a.optimalMoves,optimalPushes:a.optimalPushes},$.read(),void 0,n),s=Ko.map(e=>({id:e.id,position:e.position,wave:e.wave,title:r.levels[e.id]?.title??r.messages.mission.fallbackTitle}));$o=i.level.id,Qo?.destroy(),Qo=Vo(Uo,{level:o.level,campaignPosition:i.entry.position,campaignLength:U.levels.length,campaignLevels:s,dailyLevelIds:ma,optimalResult:{moves:o.optimalMoves,pushes:o.optimalPushes},catalog:r,controlPreferences:ts,mode:e.mode,metricStore:Xo,measurement:Zo,onSelectLevel:(e,t)=>is({position:e,mode:t},!1,!1),onLocaleChange:e=>{es=Yo.write(e),is(ns,!0)},onControlPreferencesChange:e=>(ts=Jo.write(e),ts),...t?{restoreFocus:`settings`}:{},now:()=>Wo,saveStore:$,...Q?{storage:Q}:{}}),t&&window.setTimeout(()=>{Uo.querySelector(`[data-action='settings']`)?.focus()},100)}var as=U.levels.map(({level:e})=>e.id);function os(e){let t=So(e?window.location.search:``,window.location.hash);if(t.seed===void 0&&t.trigger===void 0&&!t.reveal)return;let{pathname:n,search:r,hash:i}=window.location;try{window.history.replaceState(window.history.state,``,Co(n,r,i))}catch{}if(t.trigger!==void 0&&uo(Q,t.trigger),t.seed!==void 0){let n=$.read().campaign.highestUnlocked,r=Math.min(t.seed+1,as.length);$.update(e=>Fa(e,as,r)??e),!e&&$.read().campaign.highestUnlocked!==n&&is(ga($.read(),U,qo))}t.reveal&&!e&&Ao({locale:es,storage:Q,skipGate:!0})}var ss=So(window.location.search,window.location.hash);os(!0),is(ga($.read(),U,qo)),ss.reveal&&Ao({locale:es,storage:Q,skipGate:!0}),window.addEventListener(`hashchange`,()=>os(!1)),window.addEventListener(`load`,()=>{});