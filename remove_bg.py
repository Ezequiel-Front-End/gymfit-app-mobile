from PIL import Image
import sys

def make_transparent():
    try:
        img = Image.open('c:\\projetos_web\\gymfit-app-mobile\\public\\workout_success.jpg').convert('RGBA')
        datas = img.getdata()
        
        new_data = []
        for item in datas:
            # item is (R, G, B, A)
            # The background is a light grey, roughly above (200, 200, 200) and low contrast
            # The character has black lines and yellow/skin tones.
            if item[0] > 180 and item[1] > 180 and item[2] > 180 and abs(item[0]-item[1]) < 20 and abs(item[1]-item[2]) < 20:
                # Calculate alpha based on how close to white it is for anti-aliasing
                # 255 = fully transparent if it's white, but we want 0 alpha for white.
                avg = (item[0] + item[1] + item[2]) / 3
                if avg > 240:
                    new_data.append((255, 255, 255, 0))
                else:
                    # Partial transparency for shadow/grey
                    alpha = int(255 - ((avg - 180) / 75) * 255)
                    new_data.append((item[0], item[1], item[2], alpha))
            else:
                new_data.append(item)
                
        img.putdata(new_data)
        img.save('c:\\projetos_web\\gymfit-app-mobile\\public\\workout_success.png', 'PNG')
        print("Success")
    except Exception as e:
        print(f"Error: {e}")

make_transparent()
