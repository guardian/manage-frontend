package controllers

import play.api.libs.json._

object WebpackAssets {
  case class Asset(js: String)
  case class Assets(user: Asset, csr: Asset)

  implicit val assetReader: Reads[Asset] = Json.reads[Asset]
  implicit val assetsReader: Reads[Assets] = Json.reads[Assets]

  val paths = Json.parse(getClass.getClassLoader.getResourceAsStream("webpack-assets.json")).as[Assets]
}
