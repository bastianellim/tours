class HomeController < ApplicationController
  def index
    @tour = Tour.new
    
  end
end
