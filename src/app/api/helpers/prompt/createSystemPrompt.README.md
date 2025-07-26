# System Prompt Helper

このディレクトリには、キャラクター設定とプロンプト設定を組み合わせてシステムプロンプトを生成するヘルパー関数が含まれています。

## 出力形式について

**JSON 形式（推奨）**: AI が理解しやすく、構造化されたデータとして処理可能。プログラム的な処理にも適している。

**マークダウン形式**: 人間が読みやすい形式。互換性のために提供。

## 使用方法

### 基本的な使用例

```typescript
import {
  createSystemPrompt,
  createSystemPromptData,
} from "./createSystemPrompt.helper";

// デフォルト設定でJSON形式のシステムプロンプトを作成
const jsonSystemPrompt = createSystemPrompt();

// マークダウン形式でシステムプロンプトを作成（互換性のため）
const markdownSystemPrompt = createSystemPrompt({
  format: "markdown",
});

// 特定の性格でシステムプロンプトを作成
const coolSystemPrompt = createSystemPrompt({
  personalityId: "cool",
  format: "json",
});

// 構造化されたデータオブジェクトとして取得
const systemPromptData = createSystemPromptData({
  personalityId: "big_sister",
  customInstructions: [
    "ユーザーが困っているときは特に優しく対応してください",
    "技術的な質問には丁寧に説明してください",
  ],
});

// カスタム指示を追加
const customSystemPrompt = createSystemPrompt({
  personalityId: "big_sister",
  outputFormatId: "defaultMarkdown",
  customInstructions: [
    "ユーザーが困っているときは特に優しく対応してください",
    "技術的な質問には丁寧に説明してください",
  ],
  format: "json",
});
```

### 利用可能な設定を確認

```typescript
import {
  getAvailablePersonalityIds,
  getAvailableOutputFormatIds,
  getPersonality,
  createSystemPromptData,
} from "./createSystemPrompt.helper";

// 利用可能な性格IDを取得
const personalityIds = getAvailablePersonalityIds();
console.log(personalityIds); // ["cheerful_clumsy", "big_sister", "bookworm", "cool"]

// 利用可能な出力フォーマットIDを取得
const outputFormatIds = getAvailableOutputFormatIds();
console.log(outputFormatIds); // ["defaultMarkdown"]

// 特定の性格設定を取得
const personality = getPersonality("cool");
console.log(personality?.name); // "クール"

// 構造化データとして取得（JSON処理やAPI連携に便利）
const promptData = createSystemPromptData({ personalityId: "cool" });
console.log(promptData.character.personality.type); // "クール"
```

## 設定ファイルの構造

### キャラクター設定

- `src/app/api/configs/character/profile.config.ts` - キャラクターの基本プロフィール
- `src/app/api/configs/character/personalities.config.ts` - 性格設定

### プロンプト設定

- `src/app/api/configs/prompt/common.config.ts` - 共通の目的設定
- `src/app/api/configs/prompt/speakingStyles.config.ts` - 話し方スタイル設定
- `src/app/api/configs/prompt/outputFormats.config.ts` - 出力フォーマット設定

## API リファレンス

### `createSystemPrompt(options?)`

システムプロンプトを生成します。

**パラメータ:**

- `options.personalityId` (string, optional) - 使用する性格 ID（デフォルト: "cheerful_clumsy"）
- `options.outputFormatId` (string, optional) - 使用する出力フォーマット ID（デフォルト: "defaultMarkdown"）
- `options.customInstructions` (string[], optional) - 追加のカスタム指示
- `options.format` ("json" | "markdown", optional) - 出力フォーマット（デフォルト: "json"）

**戻り値:**

- `string` - 生成されたシステムプロンプト（JSON またはマークダウン形式）

### `createSystemPromptData(options?)`

構造化されたシステムプロンプトデータを生成します。JSON 処理や API 連携に便利です。

**パラメータ:**

- `options.personalityId` (string, optional) - 使用する性格 ID（デフォルト: "cheerful_clumsy"）
- `options.outputFormatId` (string, optional) - 使用する出力フォーマット ID（デフォルト: "defaultMarkdown"）
- `options.customInstructions` (string[], optional) - 追加のカスタム指示

**戻り値:**

- `SystemPromptData` - 構造化されたシステムプロンプトデータ

### `getAvailablePersonalityIds()`

利用可能な性格 ID の配列を返します。

### `getAvailableOutputFormatIds()`

利用可能な出力フォーマット ID の配列を返します。

### `getPersonality(personalityId)`

指定された性格 ID の設定を返します。

### `getSpeakingStyle(speakingStyleId)`

指定された話し方スタイル ID の設定を返します。
