class TourStep < ActiveRecord::Base
  attr_accessible :city, :country, :description, :durationDays, :sequence, :title, :transferToType, :city_lat, :city_lon
  
  belongs_to :tour
  
  validates :title, :description, :country, :city, presence: true
  validate :place_with_geolocalization
  
  def place_with_geolocalization
    if city.blank? || city_lat.blank? || city_lon.blank?
      errors.add(:city, "Invalid city. Select from the list.")
    end
  end
  
end
