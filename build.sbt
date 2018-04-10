name := """account-frontend"""
//built from https://github.com/playframework/play-scala-compile-di-example
version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.12.4"

crossScalaVersions := Seq("2.11.12", "2.12.4")

libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "3.1.2" % Test
libraryDependencies += "com.typesafe.scala-logging" %% "scala-logging" % "3.8.0"

enablePlugins(RiffRaffArtifact, JDebPackaging)

import com.typesafe.sbt.packager.archetypes.systemloader.ServerLoader.Systemd
enablePlugins(SystemdPlugin)
serverLoading in Debian := Some(Systemd)

debianPackageDependencies := Seq("openjdk-8-jre-headless")
maintainer := "digital"
packageSummary := "Brief description"
packageDescription := """Slightly longer description"""

riffRaffPackageType := (packageBin in Debian).value

riffRaffUploadArtifactBucket := Option("riffraff-artifact")
riffRaffUploadManifestBucket := Option("riffraff-builds")

PlayKeys.devSettings := Seq("play.server.http.port" -> "9233")