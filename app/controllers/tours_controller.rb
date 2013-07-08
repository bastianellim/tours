class ToursController < ApplicationController  
  before_filter :authenticate_user!, :only => [:new, :create, :mine]
  
  
  # GET /tours/1
  # GET /tours/1.json
  def show
    @tour = Tour.find(params[:id])
    @tour_step = TourStep.new

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @tour }
    end
  end
  
  # GET /tours/new
  # GET /tours/new.json
  def new
    # @user = current_user
    
    @tour = Tour.new
    #current_user.tour = @tour

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @tour }
    end
  end
  
  # POST /tours
  # POST /tours.json
  def create
    @tour = current_user.tours.build(params[:tour])

    respond_to do |format|
      if @tour.save
        format.html { redirect_to @tour, notice: 'Tour was successfully created.' }
        format.json { render json: @tour, status: :created, location: @tour }
      else
        format.html { render action: "new" }
        format.json { render json: @tour.errors, status: :unprocessable_entity }
      end
    end
  end
  
  # GET /tours/1/edit
  #def edit
  #  @tour = Tour.find(params[:id])
  #end
  
  def mine
    @tours = current_user.tours
  end
end
