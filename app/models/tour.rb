class Tour < ActiveRecord::Base
    
  attr_accessible :airport, :budget, :commercial, :commercialPrice, :departureDate, :description, :period, :returnDate, 
  :shortDescription, :title, :travelerType
  
  has_many :tour_step
  belongs_to :user
  
  validates :title, :shortDescription, :budget, presence: true
  
end
