class TourStep < ActiveRecord::Base
  attr_accessible :city, :country, :description, :durationDays, :sequence, :title, :transferToType, :city_lat, :city_lon
  
  belongs_to :tour
  
  validates :title, :description, presence: true
  
end
