class UserInfo < ActiveRecord::Base
  attr_accessible :birthday, :city, :country, :firstName, :gender, :lastName, :avatar, :city_lat, :city_lon
  has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100>", :tiny => "25x25>" }, :default_url => "/images/:style/missing.png"

  belongs_to :user
end
