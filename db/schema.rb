# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130629145121) do

  create_table "tour_steps", :force => true do |t|
    t.string   "title"
    t.integer  "sequence"
    t.string   "country"
    t.string   "city"
    t.integer  "durationDays"
    t.text     "description"
    t.string   "transferToType"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
    t.integer  "tour_id"
  end

  add_index "tour_steps", ["tour_id"], :name => "index_tour_steps_on_tour_id"

  create_table "tours", :force => true do |t|
    t.string   "title"
    t.text     "shortDescription"
    t.text     "description"
    t.string   "period"
    t.string   "airport"
    t.decimal  "budget",           :precision => 10, :scale => 0
    t.decimal  "commercialPrice",  :precision => 10, :scale => 0
    t.boolean  "commercial"
    t.date     "departureDate"
    t.date     "returnDate"
    t.string   "travelerType"
    t.datetime "created_at",                                      :null => false
    t.datetime "updated_at",                                      :null => false
    t.integer  "user_id"
  end

  add_index "tours", ["user_id"], :name => "index_tours_on_user_id"

  create_table "user_infos", :force => true do |t|
    t.string   "firstName"
    t.string   "lastName"
    t.string   "gender"
    t.date     "birthday"
    t.string   "country"
    t.string   "city"
    t.integer  "user_id"
    t.datetime "created_at",          :null => false
    t.datetime "updated_at",          :null => false
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

  add_index "user_infos", ["user_id"], :name => "index_user_infos_on_user_id"

  create_table "users", :force => true do |t|
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
    t.string   "username",               :default => "", :null => false
  end

  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true
  add_index "users", ["username"], :name => "index_users_on_username", :unique => true

end
