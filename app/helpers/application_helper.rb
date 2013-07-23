module ApplicationHelper
  
  def field_class(resource, field_name)
    
    if resource.errors[field_name]
      return "error".html_safe
    else
      return "".html_safe
    end
  end

end
