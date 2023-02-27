# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.require_version ">= 1.6.0"
VAGRANTFILE_API_VERSION = "2"
ENV['VAGRANT_DEFAULT_PROVIDER'] = 'docker'

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.define "mongo" do |config|
    config.vm.provider "docker" do |d|
      d.image = "mongo:5.0.15"
      d.ports = ['27017:27017']
      d.name = 'mongo-container'
      d.remains_running = true
    end
  end
  config.vm.define "api" do |config|
    config.vm.synced_folder "./api", "/api"
    config.vm.provider "docker" do |d|
      d.build_dir = "./api"
      d.ports = ['8000:8000']
      d.name = 'api'
      d.remains_running = true
    end
  end
end
