import { ControlMode, ControlNetUnitConfig, ResizeMode } from "../types/index.ts";
import { toBase64 } from "../utils/base64.ts";

/**
 * @class ControlNetUnit
 * @classdesc ControlNet Unit, a translation layer for [Mikubill's ControlNet API](https://github.com/Mikubill/sd-webui-controlnet)
 * @param {ControlNetUnitConfig} config Configuration for the ControlNet Unit
 * @example
 * const api = new StableDiffusionApi();
 * const image = sharp("image.png");
 *
 * const unit = new ControlNetUnit({
 *   input_image: image,
 *   module: "depth",
 *   model: "depth",
 * });
 *
 * const result = await api.txt2img({
 *   prompt: "Someone who pretends to be a world-renowned artist, but is actually a random person who prompts text and presses buttons",
 *   init_images: [image],
 *   controlnet_units: [unit],
 * })
 *
 * result.image.toFile("result.png");
 */
export default class ControlNetUnit {
  constructor(public config: ControlNetUnitConfig) { }

  async toJson() {
    const input_image = await toBase64(this.config.input_image);
    const mask = this.config.mask && (await toBase64(this.config.mask));
    const defaultResizeMode: ResizeMode = "Scale to Fit (Inner Fit)"
    const defaultControlMode: ControlMode = "Balanced"
    return {
      input_image,
      mask,
      module: this.config.module ?? "none",
      model: this.config.model ?? "None",
      weight: this.config.weight ?? 1,
      resize_mode: this.config.resize_mode ?? defaultResizeMode,
      lowvram: this.config.lowvram ?? false,
      processor_res: this.config.processor_res ?? 64,
      threshold_a: this.config.threshold_a ?? 64,
      threshold_b: this.config.threshold_b ?? 64,
      guidance: this.config.guidance ?? 1,
      guidance_start: this.config.guidance_start ?? 0,
      guidance_end: this.config.guidance_end ?? 1,
      control_mode: this.config.control_mode ?? defaultControlMode,
    } as const;
  }
}